from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from gameplay.models import *

# Create your views here.

def gameplay(request):
    # request.session['gameStateOnGoing'] = "No"
    if 'gameStateOnGoing' in request.session.keys():
        if(request.session['gameStateOnGoing'] == "Yes"):
            return render(request, "gameplay.html")
    return redirect(form)

def form(request):
    data = {'success': False} 
    if request.method == 'POST':        
        print(request.POST)
        gameStateResponse = request.POST.get('gameStateOnGoing')
        request.session['gameStateOnGoing'] = gameStateResponse

        data['success'] = True
        # request.session.set_expiry(0)
        return JsonResponse(data, safe=False)

    elif request.method == 'GET':
        return render(request, "form.html")

def openCard(request):
    if (request.GET.get('pack') == "DigDeeper1"):
        json_data = serializers.serialize('json', DigDeeper1.objects.all())

    elif (request.GET.get('pack') == "DigDeeper2"):
        json_data = serializers.serialize('json', DigDeeper2.objects.all())

    elif (request.GET.get('pack') == "DigDeeper3"):
        json_data = serializers.serialize('json', DigDeeper3.objects.all())

    elif (request.GET.get('pack') == "IceBreak"):
        json_data = serializers.serialize('json', IceBreak.objects.all())

    elif (request.GET.get('pack') == "Perspective"):
        json_data = serializers.serialize('json', Perspective.objects.all())

    elif (request.GET.get('pack') == "Stranger"):
        json_data = serializers.serialize('json', Stranger.objects.all())

    elif (request.GET.get('pack') == "Lovebirds"):
        json_data = serializers.serialize('json', Lovebirds.objects.all())

    elif (request.GET.get('pack') == "MixNMatch"):
        json_data = serializers.serialize('json', MixNMatch.objects.all())
        
    else :
        json_data = {'success' : False}
    return JsonResponse(json_data, safe=False)

def updateSession(request):
    if request.method == 'POST':        
        key = request.POST.get('key')
        value = request.POST.get('value')
        request.session[key] = value
        print(request.session[key])
    # return redirect('/')
    return HttpResponse("ok")

def feedback(request):
    return render(request, "feedback.html")

def report(request):
    return render(request, "report.html")