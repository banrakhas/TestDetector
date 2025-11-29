# backend/main.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PREDEFINED_CITIES = ["London", "Paris", "New York", "Mumbai"]

stub = {
        "London": 18.2,
        "Paris": 20.1,
        "New York": 16.4,
        "Mumbai": 29.8,
}

class WeatherResponse(BaseModel):
    city: str
    temperature: float
    condition: str
    icon: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/weather", response_model=WeatherResponse)
def get_weather(city: str = Query(...)):

    return WeatherResponse(
        city=city,
        temperature=stub.get(city, 21.0),
        condition="Sunny",
        icon="sunny"
    )
