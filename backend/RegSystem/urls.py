"""RegSystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    #path(r'admin/', admin.site.urls),
    path(r'hello', views.hello),
    path(r'auth/login', views.login),
    path(r'auth/register', views.register),
    path(r'api/userinfo', views.userinfo),
    path(r'api/check', views.checkExistence),
    path(r'api/postboard', views.postboard),
    path(r'api/email', views.email),
]
