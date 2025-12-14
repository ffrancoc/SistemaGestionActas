from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Bautismo, Comunion, Confirmacion, Matrimonio

@receiver(post_delete, sender=Bautismo)
def eliminar_dependencias_bautismo(sender, instance, **kwargs):
    registro = instance.registro
    # Comunión
    try:
        registro.comuniones.delete()
    except Comunion.DoesNotExist:
        pass
    # Confirmación
    try:
        registro.confirmaciones.delete()
    except Confirmacion.DoesNotExist:
        pass
    # Matrimonio (puede ser contrayente o contrayenta)
    try:
        registro.contrayente.delete()
    except Matrimonio.DoesNotExist:
        pass
    try:
        registro.contrayenta.delete()
    except Matrimonio.DoesNotExist:
        pass

@receiver(post_delete, sender=Comunion)
def eliminar_dependencias_comunion(sender, instance, **kwargs):
    registro = instance.registro
    try:
        registro.confirmaciones.delete()
    except Confirmacion.DoesNotExist:
        pass
    try:
        registro.contrayente.delete()
    except Matrimonio.DoesNotExist:
        pass
    try:
        registro.contrayenta.delete()
    except Matrimonio.DoesNotExist:
        pass

@receiver(post_delete, sender=Confirmacion)
def eliminar_dependencias_confirmacion(sender, instance, **kwargs):
    registro = instance.registro
    try:
        registro.contrayente.delete()
    except Matrimonio.DoesNotExist:
        pass
    try:
        registro.contrayenta.delete()
    except Matrimonio.DoesNotExist:
        pass
