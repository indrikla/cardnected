from django.shortcuts import render
from cardpack.models import *

# Create your views here.
def home(request):
    pack = Pack.objects.all()
    return render(request, "home.min.html", {'pack': pack})