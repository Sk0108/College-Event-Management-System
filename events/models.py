from django.db import models
from users.models import User

class Event(models.Model):
    CATEGORY_CHOICES = [
        ('tech', 'Technical'),
        ('cultural', 'Cultural'),
        ('sports', 'Sports'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    registration_limit = models.PositiveIntegerField(default=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    is_approved = models.BooleanField(default=False)
    registered_users = models.ManyToManyField(User, related_name='registered_events', blank=True)

    def __str__(self):
        return self.title
