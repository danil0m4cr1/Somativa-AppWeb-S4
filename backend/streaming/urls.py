from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)
from app.views import CadastroUsuarioViewSet

router = DefaultRouter()

urlpatterns = [
    path('admin/',admin.site.urls),
    path('api/', include(router.urls)),
    path('api/usuarios/cadastrar/',CadastroUsuarioViewSet.as_view(), name = 'cadastrar_usuario'),
    
    # Login - gera Access Token e Refresh Token 
    path('api/token/',
         TokenObtainPairView.as_view(),
         name= 'token_obtain_pair'
         ),
    
    # Gera um novo Access Token
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
         name = 'token_refresh'
         )
]