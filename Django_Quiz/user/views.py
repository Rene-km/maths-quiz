from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from user.serializers import RegisterUserSerializer



# Create your views here.


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status.HTTP_400_BAD_REQUEST)

