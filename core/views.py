from django.shortcuts  import render, redirect
from .forms import *
from .models import *
from django.contrib.auth.views import logout_then_login
from django.conf import settings


def comprar(request):
    if not request.user.is_authenticated:
        return redirect(to="login")
    carro = request.session.get("carro", [])
    total = 0
    for item in carro:
        total += item[1]
    venta = Venta()
    venta.cliente = request.user
    venta.total = total
    venta.save()
    for item in carro:
        detalle = DetalleVenta()
        detalle.plan = Plan.objects.get(id = item[0])
        detalle.precio = item[1]
        detalle.venta = venta
        detalle.save()
        request.session["carro"] = []
    return redirect(to=carrito)

def carrito(request):
    carro = request.session.get("carro", [])
    total = sum(item[1] for item in carro)  # Calcula el total del carrito
    return render(request,'core/carrito.html', {"carro":request.session.get("carro", []), "total": total })


def addtocar(request, codigo):
    plan = Plan.objects.get(id=codigo)
    carro = request.session.get("carro", [])   
    if carro:
        if codigo not in [item[0] for item in carro]:
            carro.append([codigo, plan.precio, plan.nombre])
    else:
        carro.append([codigo, plan.precio, plan.nombre])
    request.session["carro"] = carro
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

