🚀 What is this project?

Prepwise is an AI-powered job interview preparation platform.
	•	Users can create mock interviews
	•	AI (voice agent) asks questions like a real interviewer
	•	You answer via voice
	•	AI gives feedback, scores, and improvements

👉 Built mainly for learning how to integrate AI (voice + LLMs) into real apps

Frontend + Backend:
- Next.js

Styling:
- Tailwind CSS
- shadcn/ui

Authentication & Database:
- Firebase

AI & Voice:
- Vapi AI (voice agent)
- Google Gemini (LLM)

Validation:
- Zod

# Vapi AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

# Google AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase (Admin / Server)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=





# 1. Clone repo
git clone https://github.com/adrianhajdin/ai_mock_interviews.git

# 2. Go inside
cd ai_mock_interviews

# 3. Install dependencies
npm install

# 4. Add .env.local file (paste above variables)

# 5. Run project
npm run dev


http://localhost:3000
