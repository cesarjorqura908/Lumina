from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Venta(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(default=datetime.now())
    cliente = models.ForeignKey(to=User, on_delete=models.CASCADE)
    total = models.IntegerField()

    def __str__(self):
        return str(self.id)+" "+self.cliente.username+" "+str(self.fecha)[0:16]

# Create your models here.
class Plan(models.Model):
    id = models.AutoField(primary_key= True)
    precio = models.IntegerField()
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre

class DetalleVenta(models.Model):
    id = models.AutoField(primary_key=True)
    venta = models.ForeignKey(to=Venta, on_delete=models.CASCADE)
    plan = models.ForeignKey(to=Plan, on_delete=models.CASCADE)
    precio = models.IntegerField()

    def __str__(self):
        return str(self.id)+" "+self.plan.nombre+" "+str(self.venta.id)


