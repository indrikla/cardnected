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
        gameStateResponse = request.POST.get('gameStateOnGoing')
        request.session['gameStateOnGoing'] = gameStateResponse
        gameplayDB = GameplayRecord()
        gameplayDB.player = request.POST.get('player')
        gameplayDB.pack = request.POST.get('pack')
        gameplayDB.numOfCards = int(request.POST.get('numOfCard'))
        gameplayDB.save()
        data['success'] = True
        return JsonResponse(data, safe=False)
        
    elif request.method == 'GET':
        return render(request, "form.min.html")

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
    return HttpResponse("ok")

def feedback(request):
    return render(request, "feedback.min.html")

def report(request):
    data = {'success': False} 
    if request.method == 'POST':
        pack = request.POST.get('pack')
        issue = request.POST.get('issue')
        desc = request.POST.get('desc')
        if 'questionID' in request.session.keys() and 'question' in request.session.keys():
            Report.objects.create(question = request.session['question'], questionID = request.session['questionID'], pack = pack, report = issue, desc = desc)
            data['success'] = True
            return JsonResponse(data, safe=False)
        else :
            return JsonResponse(data, safe=False)

    elif request.method == 'GET':
        questionID = request.GET.get('id')
        question = request.GET.get('question')

        request.session['questionID'] = questionID
        request.session['question'] = question
        return render(request, 'report.min.html')