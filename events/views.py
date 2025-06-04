from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from users.models import User

class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Staff can create/edit/delete. Students can only read.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'staff'

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            return [IsStaffOrReadOnly()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
