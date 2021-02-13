from django.urls import path
from . import views

urlpatterns = [
    path('login', views.loginFunc, name='login'),
    path('logout', views.logoutFunc, name='logout'),
    path('signup', views.signup, name='signup')
]