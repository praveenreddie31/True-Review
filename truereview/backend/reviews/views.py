from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import F
from .models import Review
from .serializers import ReviewSerializer
from ai_detection.fake_review_detector import get_fake_review_score

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Review.objects.filter(is_flagged=False).order_by('-created_at')
        search_query = self.request.query_params.get('search', None)
        category = self.request.query_params.get('category', None)
        
        if search_query:
            queryset = queryset.filter(title__icontains=search_query) | queryset.filter(location__icontains=search_query)
        if category:
            queryset = queryset.filter(category__iexact=category)
            
        return queryset

    def perform_create(self, serializer):
        title = serializer.validated_data.get('title', '')
        description = serializer.validated_data.get('description', '')
        text_content = f"{title}. {description}"
        
        score = get_fake_review_score(text_content)
        is_flagged = score > 0.7
        
        review = serializer.save(
            user=self.request.user,
            ai_fake_score=score,
            is_flagged=is_flagged
        )
        
        user = self.request.user
        points_earned = 5
        if review.image:
            points_earned += 10
        if review.video:
            points_earned += 20
            
        user.points += points_earned
        user.total_reviews += 1
        user.save()

class ReviewHelpfulView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        try:
            review = Review.objects.get(pk=pk)
            review.helpful_votes += 1
            review.save()
            
            author = review.user
            author.points += 3
            author.save()
            return Response({'status': 'voted helpful'}, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

class ReviewLikeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        try:
            review = Review.objects.get(pk=pk)
            review.likes += 1
            review.save()
            return Response({'status': 'liked'}, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
