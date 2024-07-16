from django.shortcuts  import render, redirect
from .forms import *
from .models import *
from django.contrib.auth.views import logout_then_login

def carrito(request):
    return render(request,'core/carrito.html', {"carro":request.session.get("carro", [])})

from django.shortcuts import redirect
from django.http import HttpResponse
from .models import Plan  # Asegúrate de importar el modelo Plan desde tu aplicación

def addtocar(request, codigo):
    # Obtener el objeto Plan según el código proporcionado
    plan = Plan.objects.get(id=codigo)
    
    # Obtener el carrito actual de la sesión o inicializar una lista vacía si no existe
    carro = request.session.get("carro", [])   
    
    # Verificar si el carrito ya tiene productos
    if carro:
        # Verificar si el código del producto ya está en el carrito
        if codigo not in [item[0] for item in carro]:
            # Si el código no está en el carrito, agregar el nuevo producto
            carro.append([codigo, plan.precio, plan.nombre])
    else:
        # Si el carrito está vacío, agregar el nuevo producto directamente
        carro.append([codigo, plan.precio, plan.nombre])
    
    # Actualizar la sesión con el carrito actualizado
    request.session["carro"] = carro
    
    # Redirigir al usuario a la página de inicio (o cualquier otra página deseada)
    return redirect(to="home")


def elim_item(request, codigo):
    carro = request.session.get("carro", [])
    codigo = int(codigo)
    del carro[codigo]
    request.session["carro"] = carro
    return redirect(to="home")

def home(request):
    planes = Plan.objects.all()
    return render(request,'core/index.html', {'planes':planes, "carro":request.session.get("carro", [])})

def login(request):
    return render(request,'core/login.html')

def logout(request):
    return logout_then_login(request, login_url="home")

# def registro(request):
#     if request.method == "POST":
#         registro = Registro(request.post)
#         if registro.is_valid():
#             registro.save()
#         return redirect(to="login")
#     else:
#         registro = registro()
#     return render(request,'core/registro.html', {'form':registro})

def registro(request):
    if request.method == "POST":
        form = Registro(request.POST)  # Corrige aquí
        if form.is_valid():
            form.save()
            return redirect(to="login")
    else:
        form = Registro()  # Corrige aquí
    
    return render(request, 'core/registro.html', {'form': form})

def limpiar(request):
    request.session.flush()
    return redirect(to="home")

