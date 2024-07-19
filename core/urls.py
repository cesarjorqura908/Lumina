from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView


urlpatterns = [
    path('', home, name = "home"),
    path('login', LoginView.as_view(template_name='core/login.html') ,name="login"),
    path('logout', logout, name="logout"),
    path('addtocar/<codigo>', addtocar, name="addtocar"),
    path('elim_item/<codigo>', elim_item, name="elim_item"),
    path('registro',registro,name="registro"),
    path('limpiar', limpiar),
    path('carrito', carrito, name="carrito"),
    path('comprar',comprar,name="comprar"),
]
