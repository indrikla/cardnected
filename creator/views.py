from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse

# Create your views here.
def creator(request):
    return render(request, "creator.min.html")