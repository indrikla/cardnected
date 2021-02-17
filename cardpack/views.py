from django.shortcuts import render
from cardpack.models import *

# Create your views here.
def cardpack(request):
    pack = Pack.objects.all()
    return render(request, "cardpack.min.html", {'pack': pack})

def detail(request, index):
        pack = Pack.objects.get(pk=index)
        return render(request, 'detail.min.html', {'pack': pack})