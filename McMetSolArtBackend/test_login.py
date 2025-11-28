#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Test login direct"""

import requests
import json

API_URL = 'http://localhost:3000/api'

def test_login():
    """Testează login-ul"""
    
    print("🔐 Test Login...\n")
    
    data = {
        'email': 'test@test.com',
        'password': 'test123'
    }
    
    try:
        response = requests.post(
            f'{API_URL}/auth/login',
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("\n✅ Login reușit!")
            token = response.json()['data']['token']
            print(f"Token: {token}")
        else:
            print("\n❌ Login eșuat!")
            
    except Exception as e:
        print(f"❌ Eroare: {str(e)}")

if __name__ == '__main__':
    test_login()
