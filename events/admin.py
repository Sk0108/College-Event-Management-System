from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'created_by', 'is_approved')
    list_filter = ('category', 'is_approved')
    search_fields = ('title', 'description')
