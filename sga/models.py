from django.db import models
from django.utils import timezone


class CapitalizeMixing:
    def capitalize_fields(self):
        for field in getattr(self, "capitalize_fields_list", []):
            value = getattr(self, field, None)
            if isinstance(value, str):
                setattr(self, field, value.strip().title())

    def save(self, *args, **kwargs):
        self.capitalize_fields()
        super().save(*args, **kwargs)


class Registro(CapitalizeMixing, models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellido = models.CharField(max_length=100, null=False, blank=False)
    lugar_nacimiento = models.CharField(max_length=200, null=False, blank=False)
    parroquia_pertenencia = models.CharField(max_length=100, null=False, blank=False)
    fecha_nacimiento = models.DateField(null=False, blank=False)
    genero = models.CharField(max_length=10, null=False, blank=False)
    padre_nombre = models.CharField(max_length=100, null=False, blank=False)
    padre_apellido = models.CharField(max_length=100, null=False, blank=False)
    madre_nombre = models.CharField(max_length=100, null=False, blank=False)
    madre_apellido = models.CharField(max_length=100, null=False, blank=False)
    creacion = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    capitalize_fields_list = [
        "nombre",
        "apellido",
        "lugar_nacimiento",
        "parroquia_pertenencia",
        "padre_nombre",
        "padre_apellido",
        "madre_nombre",
        "madre_apellido",
    ]

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "lugar_nacimiento": self.lugar_nacimiento,
            "parroquia_pertenencia": self.parroquia_pertenencia,
            "fecha_nacimiento": self.fecha_nacimiento.strftime("%Y-%m-%d")
            if self.fecha_nacimiento
            else "",
            "genero": self.genero,
            "padre_nombre": self.padre_nombre,
            "padre_apellido": self.padre_apellido,
            "madre_nombre": self.madre_nombre,
            "madre_apellido": self.madre_apellido,
            "creacion": timezone.localtime(self.creacion).strftime("%Y-%m-%d %H:%M:%S")
            if self.creacion
            else "",
            "modificacion": timezone.localtime(self.modificacion).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            if self.modificacion
            else "",
            "estado": self.estado,
        }

    def __str__(self):
        return f"id: {self.id} - nombre: {self.nombre} {self.apellido} - fecha nacimiento: {self.fecha_nacimiento}"


class Bautismo(CapitalizeMixing, models.Model):
    registro = models.OneToOneField(
        "Registro", on_delete=models.CASCADE, related_name="bautismos"
    )
    id = models.AutoField(primary_key=True)
    no_libro = models.CharField(max_length=10, null=True, blank=True)
    no_folio = models.CharField(max_length=10, null=True, blank=True)
    no_acta = models.CharField(max_length=10, null=True, blank=True)
    parroquia_bautismo = models.CharField(max_length=100, null=False, blank=False)
    fecha_bautismo = models.DateField(null=False, blank=False)
    sacerdote = models.CharField(max_length=100, null=False, blank=False)
    padrino_1 = models.CharField(max_length=100, null=False, blank=False)
    padrino_2 = models.CharField(max_length=100, null=True, blank=True)
    creacion = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    capitalize_fields_list = [
        "parroquia_bautismo",
        "sacerdote",
        "padrino_1",
        "padrino_2",
    ]

    def to_dict(self):
        return {
            "registro": self.registro.to_dict(),
            "id": self.id,
            "no_libro": self.no_libro,
            "no_folio": self.no_folio,
            "no_acta": self.no_acta,
            "parroquia_bautismo": self.parroquia_bautismo,
            "fecha_bautismo": self.fecha_bautismo.strftime("%Y-%m-%d")
            if self.fecha_bautismo
            else "",
            "sacerdote": self.sacerdote,
            "padrino_1": self.padrino_1,
            "padrino_2": self.padrino_2,
            "creacion": timezone.localtime(self.creacion).strftime("%Y-%m-%d %H:%M:%S")
            if self.creacion
            else "",
            "modificacion": timezone.localtime(self.modificacion).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            if self.modificacion
            else "",
            "estado": self.estado,
        }

    def __str__(self) -> str:
        return f"id: {self.id} - nombre: {self.registro.nombre} {self.registro.apellido} - parroquia: {self.parroquia_bautismo} - sacerdote: {self.sacerdote}"


class Comunion(CapitalizeMixing, models.Model):
    registro = models.OneToOneField(
        "Registro", on_delete=models.CASCADE, related_name="comuniones"
    )
    id = models.AutoField(primary_key=True)
    no_libro = models.CharField(max_length=10, null=True, blank=True)
    no_folio = models.CharField(max_length=10, null=True, blank=True)
    no_acta = models.CharField(max_length=10, null=True, blank=True)
    parroquia_comunion = models.CharField(max_length=100, null=False, blank=False)
    fecha_comunion = models.DateField(null=False, blank=False)
    parroco = models.CharField(max_length=100, null=False, blank=False)
    creacion = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    capitalize_fields_list = ["parroquia_comunion", "parroco"]

    def to_dict(self):
        return {
            "registro": self.registro.to_dict(),
            "id": self.id,
            "no_libro": self.no_libro,
            "no_folio": self.no_folio,
            "no_acta": self.no_acta,
            "parroquia_comunion": self.parroquia_comunion,
            "fecha_comunion": self.fecha_comunion.strftime("%Y-%m-%d")
            if self.fecha_comunion
            else "",
            "parroco": self.parroco,
            "creacion": timezone.localtime(self.creacion).strftime("%Y-%m-%d %H:%M:%S")
            if self.creacion
            else "",
            "modificacion": timezone.localtime(self.modificacion).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            if self.modificacion
            else "",
            "estado": self.estado,
        }

    def __str__(self) -> str:
        return f"id: {self.id} - nombre: {self.registro.nombre} {self.registro.apellido} - parroquia: {self.parroquia_comunion} - parroco: {self.parroco}"


class Confirmacion(CapitalizeMixing, models.Model):
    registro = models.OneToOneField(
        "Registro", on_delete=models.CASCADE, related_name="confirmaciones"
    )
    id = models.AutoField(primary_key=True)
    no_libro = models.CharField(max_length=10, null=True, blank=True)
    no_folio = models.CharField(max_length=10, null=True, blank=True)
    no_acta = models.CharField(max_length=10, null=True, blank=True)
    parroquia_confirmacion = models.CharField(max_length=100, null=False, blank=False)
    fecha_confirmacion = models.DateField(null=False, blank=False)
    obispo = models.CharField(max_length=100, null=False, blank=False)
    parroco = models.CharField(max_length=100, null=False, blank=False)
    padrino = models.CharField(max_length=100, null=False, blank=False)
    creacion = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    capitalize_fields_list = ["parroquia_confirmacion", "obispo", "parroco", "padrino"]

    def to_dict(self):
        return {
            "registro": self.registro.to_dict(),
            "id": self.id,
            "no_libro": self.no_libro,
            "no_folio": self.no_folio,
            "no_acta": self.no_acta,
            "parroquia_confirmacion": self.parroquia_confirmacion,
            "fecha_confirmacion": self.fecha_confirmacion.strftime("%Y-%m-%d")
            if self.fecha_confirmacion
            else "",
            "obispo": self.obispo,
            "parroco": self.parroco,
            "padrino": self.padrino,
            "creacion": timezone.localtime(self.creacion).strftime("%Y-%m-%d %H:%M:%S")
            if self.creacion
            else "",
            "modificacion": timezone.localtime(self.modificacion).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            if self.modificacion
            else "",
            "estado": self.estado,
        }

    def __str__(self) -> str:
        return f"id: {self.id} - nombre: {self.registro.nombre} {self.registro.apellido} - parroquia: {self.parroquia_confirmacion} - obispo: {self.obispo} - parroco: {self.parroco}"


class Matrimonio(CapitalizeMixing, models.Model):
    id = models.AutoField(primary_key=True)
    no_libro = models.CharField(max_length=10, null=True, blank=True)
    no_folio = models.CharField(max_length=10, null=True, blank=True)
    no_acta = models.CharField(max_length=10, null=True, blank=True)
    contrayente = models.OneToOneField(
        "Registro", on_delete=models.CASCADE, related_name="contrayente"
    )
    contrayenta = models.OneToOneField(
        "Registro", on_delete=models.CASCADE, related_name="contrayenta"
    )
    testigo_1 = models.CharField(max_length=100, null=False, blank=False)
    testigo_2 = models.CharField(max_length=100, null=False, blank=False)
    parroquia_matrimonio = models.CharField(max_length=100, null=False, blank=False)
    fecha_matrimonio = models.DateField(null=False, blank=False)
    parroco = models.CharField(max_length=100, null=False, blank=False)
    creacion = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    capitalize_fields_list = [
        "testigo_1",
        "testigo_2",
        "parroquia_matrimonio",
        "parroco",
    ]

    def to_dict(self):
        return {
            "contrayente": self.contrayente.to_dict(),
            "contrayenta": self.contrayenta.to_dict(),
            "id": self.id,
            "no_libro": self.no_libro,
            "no_folio": self.no_folio,
            "no_acta": self.no_acta,
            "testigo_1": self.testigo_1,
            "testigo_2": self.testigo_2,
            "parroquia_matrimonio": self.parroquia_matrimonio,
            "fecha_matrimonio": self.fecha_matrimonio.strftime("%Y-%m-%d")
            if self.fecha_matrimonio
            else "",
            "parroco": self.parroco,
            "creacion": timezone.localtime(self.creacion).strftime("%Y-%m-%d %H:%M:%S")
            if self.creacion
            else "",
            "modificacion": timezone.localtime(self.modificacion).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            if self.modificacion
            else "",
            "estado": self.estado,
        }

    def __str__(self) -> str:
        return f"id: {self.id} - contrayente: {self.contrayente.nombre} {self.contrayente.apellido} - contrayenta: {self.contrayenta.nombre} {self.contrayenta.apellido} - parroquia: {self.parroquia_matrimonio} - parroco: {self.parroco}"
