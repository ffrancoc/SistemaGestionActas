from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from ..models import Bautismo, Registro
from django.http import JsonResponse
from ..utils import json_response
from django.utils import timezone
import json



@login_required
@require_GET
def mostrar_bautismos(request):
    bautismos = Bautismo.objects.all().values() 
    return JsonResponse(list(bautismos), safe=False)


@login_required
@require_POST
def guardar_bautismo(request):
    campos_requeridos = ['registro_id', 'parroquia_bautismo', 'fecha_bautismo', 'sacerdote', 'padrino_1']
    campos_opcionales = ['no_libro', 'no_folio', 'no_acta', 'padrino_2']

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(json_response("error", "Datos inválidos"))

    if not all(data.get(campo) for campo in campos_requeridos):
        return JsonResponse(json_response("error", "Faltan cammpos requeridos"))

    try:
        registro = Registro.objects.get(pk=data['registro_id'])
    except Registro.DoesNotExist:
        return JsonResponse(json_response("error", "Registro no encontrado"))

    datos_bautismo = {campo: data.get(campo) for campo in campos_requeridos}

    # 🔧 Aquí procesamos todos los campos opcionales, incluso si están vacíos
    for campo in campos_opcionales:
        valor = data.get(campo)
        datos_bautismo[campo] = None if valor == "" else valor

    datos_bautismo['registro'] = registro

    bautismo, creado = Bautismo.objects.update_or_create(
        registro=registro,
        defaults=datos_bautismo
    )

    mensaje = 'Registro exitoso' if creado else 'Modificación exitosa'
    return JsonResponse(json_response("ok", mensaje))


@login_required
@require_GET
def eliminar_bautismo(request, bautismo_id):
    try:
        bautismo = Bautismo.objects.get(pk=bautismo_id)
        bautismo.delete()
        return JsonResponse(json_response("ok", "Eliminación exitosa"))
    except Registro.DoesNotExist:
        return JsonResponse(json_response("error", "Registro no encontrado"))
