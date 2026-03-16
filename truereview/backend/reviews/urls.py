from django.urls import path
from .views import ReviewListCreateView, ReviewHelpfulView, ReviewLikeView

urlpatterns = [
    path('', ReviewListCreateView.as_view(), name='review-list-create'),
    path('<int:pk>/helpful/', ReviewHelpfulView.as_view(), name='review-helpful'),
    path('<int:pk>/like/', ReviewLikeView.as_view(), name='review-like'),
]
