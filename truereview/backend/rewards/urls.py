from django.urls import path
from .views import RewardListView, RedeemRewardView, UserRedemptionsView

urlpatterns = [
    path('', RewardListView.as_view(), name='reward-list'),
    path('<int:pk>/redeem/', RedeemRewardView.as_view(), name='reward-redeem'),
    path('my-redemptions/', UserRedemptionsView.as_view(), name='my-redemptions'),
]
