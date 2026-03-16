from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    points = models.IntegerField(default=0)
    total_reviews = models.IntegerField(default=0)
    badges = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username
