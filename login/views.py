from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

# Create your views here.


def loginFunc(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('/login')
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {'form': form})


def logoutFunc(request):
    logout(request)
    return redirect('/')


def signup(request):
    if request.method == "POST":
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/')
        # else :
        #     message = 'Oopsie! Sign Up failed. Please try again'
        #     return render(request, 'signup.html', { 'message' : message })
    else:
        form = UserCreationForm()
    return render(request, "signup.html", {'form': form})
