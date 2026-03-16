# TrueReview - Genuine Feedback & Reward Platform

TrueReview is a full-stack web application allowing users to post verified reviews with proof (images, videos), earn reward points, and redeem them for premium rewards. It uses an AI fake-review detection system to flag suspicious reviews before publication.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Django, Django Rest Framework, SQLite
- **AI**: Scikit-Learn (TF-IDF + Logistic Regression)
- **Auth**: JWT (SimpleJWT)

## Step-by-Step Instructions to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd .gemini/antigravity/scratch/truereview/backend
   ```
2. Activate the virtual environment:
   - On Windows: `.\venv\Scripts\activate`
   - On Mac/Linux: `source venv/bin/activate`
3. Install dependencies (if not already installed):
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers scikit-learn pillow
   ```
4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Create an admin superuser (optional, but needed to add rewards):
   ```bash
   python manage.py createsuperuser
   ```
6. Start the Django server:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd .gemini/antigravity/scratch/truereview/truereview_frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### 3. Usage
- Go to `http://localhost:5173` in your browser.
- Register a new account and log in.
- Click "Write Review" to post a review and upload an image (+10pts) or video (+20pts) to earn points (Text itself is +5pts).
- Spam or completely fake review text will be flagged by the included Scikit-Learn AI model.
- Go to the Rewards page to redeem accumulated points. Be sure to add some rewards via Django Admin first at `http://127.0.0.1:8000/admin`.
