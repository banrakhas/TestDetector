# backend/tests/test_main.py
from fastapi.testclient import TestClient
from weather_app_api import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}

def test_weather_valid_city():
    res = client.get("/weather?city=London")
    assert res.status_code == 200
    data = res.json()
    assert data["city"] == "London"
    assert "temperature" in data
    assert "condition" in data
    assert "icon" in data

def test_weather_invalid_city_defaults():
    res = client.get("/weather?city=UnknownCity")
    assert res.status_code == 200
    data = res.json()
    # Should default to one of the predefined cities (London in our stub)
    assert data["city"] not in ["London", "Paris", "New York", "Mumbai"]