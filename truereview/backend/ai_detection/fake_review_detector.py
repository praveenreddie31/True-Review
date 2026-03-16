import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

class FakeReviewDetector:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.model = LogisticRegression()
        self._train_dummy_model()

    def _train_dummy_model(self):
        # Dummy data for demonstration purposes
        documents = [
            "This product is amazing, I love it!",
            "Terrible experience, would not recommend.",
            "Click here to buy cheap generic meds http://spam.com",
            "Best product ever! Buy it now! 100% guarantee!",
            "The food was okay, but the service was a bit slow.",
            "Great movie, highly recommend for families.",
            "Earn $5000 a week from home by clicking this link!",
            "I hated the hotel, there were bugs everywhere.",
            "Please visit my website for more deals!!!",
            "Average college, good professors but poor infrastructure."
        ]
        labels = [0, 0, 1, 1, 0, 0, 1, 0, 1, 0] # 1 is fake/spam, 0 is genuine

        X = self.vectorizer.fit_transform(documents)
        self.model.fit(X, labels)

    def clean_text(self, text):
        return str(text).lower().strip()

    def extract_features(self, text):
        return self.vectorizer.transform([text])

    def predict_fake_probability(self, text):
        cleaned = self.clean_text(text)
        features = self.extract_features(cleaned)
        # Returns probability of class 1 (fake)
        prob = self.model.predict_proba(features)[0][1]
        return float(prob)

detector = FakeReviewDetector()

def get_fake_review_score(text):
    return detector.predict_fake_probability(text)
