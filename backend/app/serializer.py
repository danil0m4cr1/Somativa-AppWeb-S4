# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User

class CadastroUsuarioSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)

    def validated_username(self, value):
        if User.objects.filter(username = value).exists():
            raise serializers.ValidationError(
                "Este nome de usuário já está cadastrado"
            )
        
        return value

    def validate_email(self, value):
        if User.objects.filter(email = value).exists():
            raise serializers.ValidationError(
                "Este email já está cadastrado"
            )
        return value

    def create(self, validated_data):
        # Criando o usuario de autenticacao do django

        email = validated_data["email"].strip().lower()

        usuario = User.objects.create_user(
            username = email,
            email = email,
            password = validated_data['password']
        )

        return usuario

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "email": instance.email,
        }