from django.db import models

# Create your models here.
class Plan(models.Model):
    id = models.AutoField(primary_key= True)
    precio = models.IntegerField()
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre  

