from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Reward(models.Model):
    reward_name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    points_required = models.IntegerField()
    stock = models.IntegerField(default=10)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.reward_name} - {self.brand}"

class Redemption(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='redemptions')
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    redeem_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Success')

    def __str__(self):
        return f"{self.user.username} redeemed {self.reward.reward_name}"
