from django.db import models



class Persona(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellido = models.CharField(max_length=100, null=False, blank=False)
    lugar_nacimiento = models.CharField(max_length=200, null=False, blank=False)
    parroquia_pertenencia = models.CharField(max_length=100, null=False, blank=False, default="N/D")
    fecha_nacimiento = models.DateField(null=False, blank=False)
    genero = models.CharField(max_length=10, null=False, blank=False)

    padre_nombre =  models.CharField(max_length=100, null=False, blank=False)
    padre_apellido =  models.CharField(max_length=100, null=False, blank=False)
    madre_nombre =  models.CharField(max_length=100, null=False, blank=False)
    madre_apellido =  models.CharField(max_length=100, null=False, blank=False)

    creacion =  models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion =  models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1) 


    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    

class Bautismo(models.Model):
    persona = models.ForeignKey('Persona', on_delete=models.CASCADE, related_name='bautismos') 
    parroquia_bautismo = models.CharField(max_length=100, null=False, blank=False)
    sacerdote = models.CharField(max_length=100, null=False, blank=False)
    padrino_1 = models.CharField(max_length=100, null=False, blank=False)
    padrino_2 = models.CharField(max_length=100, null=False, blank=False)
    creacion =  models.DateTimeField(auto_now_add=True, null=False, blank=False)
    modificacion =  models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=False, blank=False, default=1)

    def __str__(self) -> str:
        return f"{self.parroquia_bautismo}"