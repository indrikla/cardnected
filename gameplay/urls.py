from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.gameplay, name= 'gameplay'),
    path('showCard', views.showCard, name='showCard'),
    path('openCard', views.openCard, name='openCard')
]