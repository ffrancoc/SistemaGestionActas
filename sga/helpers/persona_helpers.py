from ..models import Persona

def validar_campos(data):
    campos_requeridos = [
        'nombre', 'apellido', 'lugar_nacimiento', 'fecha_nacimiento', 'genero',
        'padre_nombre', 'padre_apellido', 'madre_nombre', 'madre_apellido'
    ]
    return all(data.get(field) for field in campos_requeridos)


def construir_persona(data):
    return Persona(**{campo: data[campo] for campo in data})

def serializar_persona(persona):
    return {
        'id': persona.id,
        'nombre': persona.nombre,
        'apellido': persona.apellido,
        'lugar_nacimiento': persona.lugar_nacimiento,
        'fecha_nacimiento': persona.fecha_nacimiento.isoformat(),
        'genero': persona.genero,
        'padre_nombre': persona.padre_nombre,
        'padre_apellido': persona.padre_apellido,
        'madre_nombre': persona.madre_nombre,
        'madre_apellido': persona.madre_apellido
    }