from django.shortcuts import render

# Create your views here.
def cardpack(request):
    return render(request, "cardpack.html")