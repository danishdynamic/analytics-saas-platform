from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_signup_and_login():
    # Signup
    response = client.post("/api/v1/auth/signup", json={
        "email": "test@example.com",
        "password": "testpass123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    
    # Login
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "testpass123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data

def test_health():
    response = client.get("/api/v1/health/ping")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}