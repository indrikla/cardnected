from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import *

# Create your views here.
def gameplay(request):
    return render(request, "gameplay.html")

def showCard(request):
    if (request.GET['pack'] == "DigDeeper"):
        json_data = serializers.serialize('json', DigDeeper.objects.all())
    elif (request.GET['pack'] == "IceBreak"):
        json_data = serializers.serialize('json', IceBreak.objects.all())
    else :
        json_data = {'success' : 'false'}
    return redirect('gameplay')

def openCard(request):
    if (request.GET['pack'] == "DigDeeper"):
        json_data = serializers.serialize('json', DigDeeper.objects.all())
    elif (request.GET['pack'] == "IceBreak"):
        json_data = serializers.serialize('json', IceBreak.objects.all())
    else :
        json_data = {'success' : 'false'}
    return JsonResponse(json_data, safe=False)
