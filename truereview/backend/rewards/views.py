from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Reward, Redemption
from .serializers import RewardSerializer, RedemptionSerializer

class RewardListView(generics.ListAPIView):
    queryset = Reward.objects.filter(availability=True, stock__gt=0)
    serializer_class = RewardSerializer
    permission_classes = (permissions.AllowAny,)

class RedeemRewardView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        try:
            reward = Reward.objects.get(pk=pk)
            user = request.user
            
            if not reward.availability or reward.stock <= 0:
                return Response({'error': 'Reward not available'}, status=status.HTTP_400_BAD_REQUEST)
                
            if user.points < reward.points_required:
                return Response({'error': 'Insufficient points'}, status=status.HTTP_400_BAD_REQUEST)
                
            user.points -= reward.points_required
            user.save()
            
            reward.stock -= 1
            if reward.stock == 0:
                reward.availability = False
            reward.save()
            
            redemption = Redemption.objects.create(user=user, reward=reward)
            serializer = RedemptionSerializer(redemption)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Reward.DoesNotExist:
            return Response({'error': 'Reward not found'}, status=status.HTTP_404_NOT_FOUND)

class UserRedemptionsView(generics.ListAPIView):
    serializer_class = RedemptionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Redemption.objects.filter(user=self.request.user).order_by('-redeem_date')
