def test_signup_returns_token(client):
    response = client.post("/api/v1/auth/signup", json={"email": "user@example.com", "password": "password"})
    assert response.status_code == 200
    assert "access_token" in response.json()
