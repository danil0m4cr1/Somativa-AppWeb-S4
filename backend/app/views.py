# views.py
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from .serializer import CadastroUsuarioSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view

class CadastroUsuarioViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CadastroUsuarioSerializer
    permission_classes = [AllowAny]