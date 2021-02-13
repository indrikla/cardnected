from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.cardpack, name= 'cardpack'),
    path('<int:index>/', views.detail, name="detail"),
]