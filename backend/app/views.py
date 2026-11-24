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

@api_view(['POST'])
def login_usuario(request):
    email = request.data.get('email', '').strip().lower()
    password = request.data.get('password', '')

    if not email or not password:
        return Response(
            {'detail': 'Informe o e-mail e a senha.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    usuario = authenticate(
        request,
        username=email,
        password=password
    )

    if usuario is None:
        return Response(
            {'detail': 'E-mail ou senha inválidos.'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response({
        'id': usuario.id,
        'email': usuario.email,
        'detail': 'Login realizado com sucesso.'
    }, status=status.HTTP_200_OK)