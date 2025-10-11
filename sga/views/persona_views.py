from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.contrib import messages
from django.utils import timezone
from django.db.models import Q
from ..models import Persona
import json



@login_required
@require_GET
def tabla_personas(request):
    filtro = request.GET.get('q', '').strip()
    pagina = int(request.GET.get('page', 1))
    por_pagina = int(request.GET.get('limit', 10))

    personas = Persona.objects.all().order_by("-creacion")
    if filtro:
        personas = personas.filter(
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

    paginador = Paginator(personas, por_pagina)
    pagina_obj = paginador.get_page(pagina)

    return render(request, 'components/tabla_listar_personas.html', {
        'lista_personas': pagina_obj,
        'filtro': filtro
    })

@login_required
@require_GET
def mostrar_personas(request):
    return render(request, 'personas.html')


@login_required
@require_POST
def guardar_persona(request):
    campos_requeridos = ['nombre', 'apellido', 'lugar_nacimiento', 'parroquia_pertenencia', 'fecha_nacimiento', 'genero', 'padre_nombre', 'padre_apellido', 'madre_nombre', 'madre_apellido']
    data = json.loads(request.body)

    if not all(data.get(campo) for campo in campos_requeridos):
        return JsonResponse({'mensaje': 'Registro fallido'})

    Persona.objects.create(**{campo: data[campo] for campo in campos_requeridos})
    return JsonResponse({'mensaje': 'Registro exitoso'})


@login_required
@require_GET
def detalle_persona(request, persona_id):
    persona = get_object_or_404(Persona, id=persona_id)
    
    data = {
        'nombre': persona.nombre,
        'apellido': persona.apellido,
        'lugar_nacimiento': persona.lugar_nacimiento,
        'parroquia_pertenencia': persona.parroquia_pertenencia,
        'fecha_nacimiento': persona.fecha_nacimiento.strftime('%Y-%m-%d') if persona.fecha_nacimiento else '',
        'genero': persona.genero,
        'madre_nombre': persona.madre_nombre,
        'madre_apellido': persona.madre_apellido,
        'padre_nombre': persona.padre_nombre,
        'padre_apellido': persona.padre_apellido,
        'creacion': timezone.localtime(persona.creacion).strftime('%Y-%m-%d %H:%M:%S') if persona.creacion else '',
        'modificacion':  timezone.localtime(persona.modificacion).strftime('%Y-%m-%d %H:%M:%S') if persona.modificacion else ''
    }

    return JsonResponse(data)


@login_required
@require_POST
def modificar_persona(request):
    campos_requeridos = ['edit_nombre', 'edit_apellido', 'edit_lugar_nacimiento', 'edit_parroquia_pertenencia', 'edit_fecha_nacimiento', 'edit_genero', 'edit_padre_nombre', 'edit_padre_apellido', 'edit_madre_nombre', 'edit_madre_apellido']
    data = json.loads(request.body)
    
    if not all(data.get(campo) for campo in campos_requeridos):
        return JsonResponse({'mensaje': 'Modificación fallida'})

    persona = get_object_or_404(Persona, id=data['edit_id'])

    for campo in campos_requeridos:
        setattr(persona, campo.replace('edit_', ''), data[campo])


    persona.modificacion=timezone.now()    

    print(persona.parroquia_pertenencia)
    persona.save()
            
    return JsonResponse({'mensaje': 'Modificación fallida'})
    
@login_required
@require_GET
def eliminar_persona(request, persona_id):
    persona = get_object_or_404(Persona, id=persona_id)
    persona.delete()
    return JsonResponse({'mensaje': 'Eliminación exitosa'})
    