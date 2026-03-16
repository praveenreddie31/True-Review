from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.IntegerField()
    category = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='reviews/images/', blank=True, null=True)
    video = models.FileField(upload_to='reviews/videos/', blank=True, null=True)
    ai_fake_score = models.FloatField(default=0.0)
    is_flagged = models.BooleanField(default=False)
    helpful_votes = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.username}"
