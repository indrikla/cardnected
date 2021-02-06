from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.core import serializers
from .models import *

# Create your views here.

def gameplay(request):
    # request.session['gameStateOnGoing'] = "No"
    if(request.session['gameStateOnGoing'] == "Yes"):
        print(request.session['gameStateOnGoing'])
        return render(request, "gameplay.html")
    else :
        return redirect(form)

def form(request):
    data = {'success': False} 
    if request.method == 'POST':        
        print("MASUK FORM")
        gameStateResponse = request.POST.get('gameStateOnGoing')
        request.session['gameStateOnGoing'] = gameStateResponse
        print(request.session['gameStateOnGoing'])
        data['success'] = True
        return JsonResponse(data, safe=False)
    elif request.method == 'GET':
        return render(request, "form.html")

def openCard(request):
    if (request.GET.get('pack') == "DigDeeper"):
        json_data = serializers.serialize('json', DigDeeper.objects.all())
    elif (request.GET.get('pack') == "IceBreak"):
        json_data = serializers.serialize('json', IceBreak.objects.all())
    else :
        json_data = {'success' : False}
    return JsonResponse(json_data, safe=False)

def updateSession(request):
    if request.method == 'POST':        
        key = request.POST.get('key')
        value = request.POST.get('value')
        print(key)
        print(value)
        request.session[key] = value
        print(request.session[key])
    return HttpResponse('Success')