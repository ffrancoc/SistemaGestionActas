from ..models import Registro, Bautismo, Comunion, Confirmacion, Matrimonio
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse
from ..utils import json_response
from django.utils import timezone
from django.db.models import Q
import json



@login_required
@require_GET
def tabla_registros(request):
    filtro = request.GET.get('q', '').strip()
    pagina = int(request.GET.get('page', 1))
    por_pagina = int(request.GET.get('limit', 20))

    registros = Registro.objects.all().order_by("-creacion")
    if filtro:
        registros = registros.filter(
            Q(nombre__icontains=filtro) |
            Q(apellido__icontains=filtro) |
            Q(lugar_nacimiento__icontains=filtro) |
            Q(parroquia_pertenencia__icontains=filtro) |
            Q(fecha_nacimiento__icontains=filtro) |
            Q(padre_nombre__icontains=filtro) |
            Q(padre_apellido__icontains=filtro) |
            Q(madre_nombre__icontains=filtro) |
            Q(madre_apellido__icontains=filtro) |
            Q(lugar_nacimiento__icontains=filtro)
        )

    paginador = Paginator(registros, por_pagina)
    pagina_obj = paginador.get_page(pagina)

    return render(request, 'components/registros/listar_tabla.html', {
        'registros': pagina_obj,
        'filtro': filtro
    })

@login_required
@require_GET
def mostrar_registros(request):
    return render(request, 'registros.html')


@login_required
@require_POST
def guardar_registro(request):
    campos_requeridos = [
        'nombre', 'apellido', 'lugar_nacimiento', 'parroquia_pertenencia', 'fecha_nacimiento', 
        'genero', 'padre_nombre', 'padre_apellido', 'madre_nombre', 'madre_apellido'
    ]

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(json_response('error', 'Datos inválidos'))

    if not all(data.get(campo) for campo in campos_requeridos):
        return JsonResponse(json_response('error', 'Faltan campos requeridos'))

    datos_registro = {campo: data.get(campo) for campo in campos_requeridos}

    registro_id = data.get('registro_id')
    if registro_id and str(registro_id).isdigit():
        try:
            registro = Registro.objects.get(pk=registro_id)
            for campo, valor in datos_registro.items():
                setattr(registro, campo, valor)
            registro.save()
            mensaje = 'Modificación exitosa'
        except Registro.DoesNotExist:
            return JsonResponse(json_response('error', 'Registro no encontrado'))
    else:
        registro = Registro.objects.create(**datos_registro)
        mensaje = 'Registro creado exitosamente'

    return JsonResponse(json_response('ok', mensaje))


@login_required
@require_GET
def detalle_registro(request, registro_id):
    try:
        registro = Registro.objects.get(pk=registro_id)
        data = registro.to_dict()
        return JsonResponse(json_response('ok', data))
    except Registro.DoesNotExist:
        return JsonResponse(json_response('error', 'Registro no encontrado'))
    
    
@login_required
@require_GET
def eliminar_registro(request, registro_id):
    try:
        registro = Registro.objects.get(pk=registro_id)
        registro.delete()
        return JsonResponse(json_response("ok", "Eliminación exitosa"))
    except Registro.DoesNotExist:
        return JsonResponse(json_response("error", "Registro no encontrado"))
    

@login_required
@require_GET
def detalle_actas(request, registro_id):
    try:
        data = {  }
        registro = Registro.objects.filter(pk=registro_id).first()
        if registro:
            bautismo = Bautismo.objects.filter(registro_id=registro.id).first()
            comunion = Comunion.objects.filter(registro_id=registro.id).first()
            confirmacion = Confirmacion.objects.filter(registro_id=registro.id).first()
            matrimonio = Matrimonio.objects.filter(Q(contrayente_id=registro.id) | Q(contrayenta_id=registro.id)).first()


            data['registro'] = registro.to_dict()

            if bautismo:
                data['bautismo'] = bautismo.to_dict()
            if comunion:
                data['comunion'] = comunion.to_dict()
            if confirmacion:
                data['confirmacion'] = confirmacion.to_dict()
            if matrimonio:
                data['matrimonio'] = matrimonio.to_dict()

        return JsonResponse(json_response('ok', data))
    except Registro.DoesNotExist:
        return JsonResponse(json_response('error', 'Registro no encontrado'))
    