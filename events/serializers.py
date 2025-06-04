from rest_framework import serializers
from .models import Event
from users.models import User

class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    registered_users = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )

    class Meta:
        model = Event
        fields = '__all__'
