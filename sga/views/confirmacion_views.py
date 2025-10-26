from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from ..models import Confirmacion, Registro
from django.http import JsonResponse
from ..utils import json_response
from django.utils import timezone
import json


@login_required
@require_GET
def mostrar_confirmaciones(request):
    confirmaciones = Confirmacion.objects.all().values()
    return JsonResponse(list(confirmaciones), safe=False)


@login_required
@require_POST
def guardar_confirmacion(request):
    campos_requeridos = [
        "registro_id",
        "parroquia_confirmacion",
        "fecha_confirmacion",
        "obispo",
        "parroco",
        "padrino",
    ]
    campos_opcionales = ["no_libro", "no_folio", "no_acta"]

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(json_response("error", "Datos inválidos"))

    if not all(data.get(campo) for campo in campos_requeridos):
        return JsonResponse(json_response("error", "Faltan campos requeridos"))

    try:
        registro = Registro.objects.get(pk=data["registro_id"])
    except Registro.DoesNotExist:
        return JsonResponse(json_response("error", "Registro no encontrado"))

    datos_confirmacion = {campo: data.get(campo) for campo in campos_requeridos}

    # 🔧 Aquí procesamos todos los campos opcionales, incluso si están vacíos
    for campo in campos_opcionales:
        valor = data.get(campo)
        datos_confirmacion[campo] = None if valor == "" else valor

    datos_confirmacion["registro"] = registro

    confirmacion, creado = Confirmacion.objects.update_or_create(
        registro=registro,
        defaults={**datos_confirmacion, "modificacion": timezone.now()},
    )

    mensaje = "Registro exitoso" if creado else "Modificación exitosa"
    return JsonResponse(json_response("ok", mensaje))


@login_required
@require_GET
def eliminar_confirmacion(request, confirmacion_id):
    try:
        confirmacion = Confirmacion.objects.get(pk=confirmacion_id)
        confirmacion.delete()
        return JsonResponse(json_response("ok", "Eliminación exitosa"))
    except Registro.DoesNotExist:
        return JsonResponse(json_response("error", "Registro no encontrado"))
