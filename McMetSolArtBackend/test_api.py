#!/usr/bin/env python3
"""
Script de test automat pentru backend:
- verifică /api/health
- încearcă înregistrare cu email unic
- încearcă login și verifică token

Rulează:
    python .\McMetSolArtBackend\migrate_add_api_token.py
    python .\McMetSolArtBackend\app.py  (în alt terminal sau background)
    python .\McMetSolArtBackend\test_api.py
"""
import sys
import json
import uuid
import time

try:
    import requests
except ImportError:
    requests = None
    import urllib.request
    import urllib.error

BASE = 'http://127.0.0.1:5000'


def http_request(method, path, json_data=None, headers=None):
    url = BASE + path
    headers = headers or {}
    if requests:
        r = requests.request(method, url, json=json_data, headers=headers, timeout=10)
        return r.status_code, r.headers.get('content-type',''), r.text
    else:
        data = None
        if json_data is not None:
            data = json.dumps(json_data).encode('utf-8')
            headers['Content-Type'] = 'application/json'
        req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                body = resp.read().decode('utf-8')
                return resp.getcode(), resp.getheader('Content-Type',''), body
        except urllib.error.HTTPError as e:
            try:
                body = e.read().decode('utf-8')
            except Exception:
                body = str(e)
            return e.code, e.headers.get('Content-Type',''), body
        except Exception as e:
            return None, None, str(e)


def check_health():
    print('=== Health check ===')
    status, ctype, body = http_request('GET', '/api/health')
    print('Status:', status)
    print('Body:', body)
    return status == 200


def register_user(email, password, first_name='Test', last_name='User'):
    print(f'=== Register {email} ===')
    payload = {
        'email': email,
        'password': password,
        'first_name': first_name,
        'last_name': last_name,
        'language': 'ro'
    }
    status, ctype, body = http_request('POST', '/api/auth/register', json_data=payload)
    print('Status:', status)
    print('Body:', body)
    try:
        data = json.loads(body)
    except Exception:
        data = None
    return status, data


def login_user(email, password):
    print(f'=== Login {email} ===')
    payload = {'email': email, 'password': password}
    status, ctype, body = http_request('POST', '/api/auth/login', json_data=payload)
    print('Status:', status)
    print('Body:', body)
    try:
        data = json.loads(body)
    except Exception:
        data = None
    return status, data


if __name__ == '__main__':
    # Wait a bit to allow server to start
    print('Aștept serverul pe http://127.0.0.1:5000 ...')
    for i in range(8):
        ok = check_health()
        if ok:
            break
        print('Server down sau nu răspunde, încerc peste 1s...')
        time.sleep(1)

    if not ok:
        print('\n❌ Serverul nu răspunde la health check. Asigură-te că backend-ul este pornit.')
        sys.exit(2)

    # Use unique email to avoid conflicts
    unique = str(uuid.uuid4())[:8]
    email = f'test+{unique}@example.com'
    password = 'Test1234'

    status_reg, data_reg = register_user(email, password)
    if status_reg not in (200, 201):
        print('\n⚠️  Înregistrare posibil eșuată (poate deja există) — încercăm login direct')

    status_login, data_login = login_user(email, password)
    if status_login == 200 and data_login and data_login.get('data'):
        token = data_login['data'].get('token') or data_login['data'].get('user', {}).get('apiToken')
        print('\n✅ Login reușit. Token:', token)
        sys.exit(0)
    else:
        print('\n❌ Login eșuat. Verifică logurile backend.')
        sys.exit(3)
