import pytest
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask
from backend import create_app, db

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

def test_donor_registration(client):
    """Test donor registration integration"""
    donor_data = {
        'name': 'Test Donor',
        'email': 'test@donor.com',
        'blood_type': 'A+',
        'contact': '1234567890'
    }
    response = client.post('/api/donors', json=donor_data)
    assert response.status_code == 200
    assert b'added successfully' in response.data

def test_hospital_registration(client):
    """Test hospital registration integration"""
    hospital_data = {
        'name': 'Test Hospital',
        'email': 'test@hospital.com',
        'address': '123 Test St',
        'contact': '1234567890'
    }
    response = client.post('/api/hospitals', json=hospital_data)
    assert response.status_code == 200
    assert b'added' in response.data

def test_blood_request_flow(client):
    """Test complete blood request flow"""
    # 1. Add a hospital
    hospital_data = {
        'name': 'Test Hospital',
        'email': 'test@hospital.com',
        'address': '123 Test St',
        'contact': '1234567890'
    }
    response = client.post('/api/hospitals', json=hospital_data)
    assert response.status_code == 200

    # 2. Approve the hospital
    hospital_id = 1  # Assuming this is the first hospital
    response = client.post(f'/api/hospitals/{hospital_id}/approve')
    assert response.status_code == 200

    # 3. Create a blood request
    request_data = {
        'hospital_id': hospital_id,
        'blood_type': 'A+',
        'units': 2,
        'urgency': 'High',
        'patient_name': 'Test Patient'
    }
    response = client.post('/api/requests', json=request_data)
    assert response.status_code == 200
    assert b'Request added' in response.data

    # 4. Update request status
    request_id = 1  # Assuming this is the first request
    status_update = {'status': 'fulfilled'}
    response = client.post(f'/api/requests/{request_id}/status', json=status_update)
    assert response.status_code == 200
    assert b'status updated' in response.data