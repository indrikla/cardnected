from django.contrib import admin
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('', views.gameplay, name= 'gameplay'),
    path('form', views.form, name='form'),
    path('openCard', views.openCard, name='openCard'),
    path('updateSession', views.updateSession, name='updateSession'),
    path('feedback', views.feedback, name='feedback'),
    re_path(r'^report/$', views.report, name='report'),
]
