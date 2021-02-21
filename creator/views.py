from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from creator.models import *

# Create your views here.
def creator(request):
    log = ChangeLog.objects.all()
    return render(request, "creator.html", {'log': log})