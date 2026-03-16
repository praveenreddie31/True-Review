from rest_framework import serializers
from .models import Reward, Redemption

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

class RedemptionSerializer(serializers.ModelSerializer):
    reward_detail = RewardSerializer(source='reward', read_only=True)
    
    class Meta:
        model = Redemption
        fields = '__all__'
        read_only_fields = ('user', 'redeem_date', 'status')
