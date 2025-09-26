from rest_framework import serializers
from .models import Job
from dj_rest_auth.registration.serializers import RegisterSerializer


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):
    """
    A custom registration serializer to remove the default password validation.
    """
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        return super().validate(data)