from rest_framework import serializers
from user.models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ("email", "username", "first_name", "password")
        extra_kwargs = {"password": {"write_only": True}}
        
    
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance
    


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['name'] = user.first_name
        # ...

        return token
