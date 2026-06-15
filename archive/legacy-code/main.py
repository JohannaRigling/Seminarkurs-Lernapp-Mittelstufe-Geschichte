from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Geschichts-Lernapp API",
    description="Backend API für die Geschichts-Lernapp mit KI-Integration",
    version="0.1.0"
)

# CORS Middleware für Frontend-Kommunikation
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React Dev Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Willkommen zur Geschichts-Lernapp API",
        "status": "online",
        "version": "0.1.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Hier kommen später die Router für:
# - /auth (Anmeldung/Registrierung)
# - /users (Nutzerverwaltung)
# - /chat (KI-Chat)
# - /progress (Lernfortschritt)
# - /exercises (Übungen)
# - /timeline (Zeitstrahl)
