# 🔌 API ENDPOINTS COMPLETE
## MC MetSolArt - REST API Specification

**Base URL:** `https://api.mcmetsolart.com/v1`  
**Format:** JSON  
**Autentificare:** JWT Bearer Token

---

## 🔐 AUTENTIFICARE

### POST /auth/register
Înregistrare utilizator nou

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "password_confirmation": "Password123!",
  "first_name": "Ion",
  "last_name": "Popescu",
  "phone": "+40123456789",
  "language": "ro"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Cont creat cu succes!",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "Ion",
      "last_name": "Popescu"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/login
Autentificare utilizator

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "Ion",
      "last_name": "Popescu",
      "avatar": "https://..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/logout
Deconectare utilizator

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "success": true,
  "message": "Deconectat cu succes"
}
```

### POST /auth/forgot-password
Cerere resetare parolă

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Email trimis cu instrucțiuni de resetare"
}
```

### POST /auth/reset-password
Resetare parolă cu token

**Request:**
```json
{
  "token": "abc123...",
  "email": "user@example.com",
  "password": "NewPassword123!",
  "password_confirmation": "NewPassword123!"
}
```

---

## 👤 UTILIZATORI

### GET /user/profile
Obține profilul utilizatorului curent

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Ion",
    "last_name": "Popescu",
    "phone": "+40123456789",
    "company": "MC MetSolArt",
    "avatar": "https://...",
    "address": {
      "address": "Strada Exemplu, Nr. 123",
      "city": "București",
      "county": "București",
      "postal_code": "010101",
      "country": "România"
    },
    "contacts": {
      "alternative_phone": "+40987654321",
      "whatsapp": "+40123456789"
    }
  }
}
```

### PUT /user/profile
Actualizare profil utilizator

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "first_name": "Ion",
  "last_name": "Popescu",
  "phone": "+40123456789",
  "company": "MC MetSolArt",
  "address": "Strada Exemplu, Nr. 123",
  "city": "București",
  "county": "București",
  "postal_code": "010101",
  "country": "România",
  "alternative_phone": "+40987654321",
  "whatsapp": "+40123456789"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profil actualizat cu succes",
  "data": { /* user data */ }
}
```

### PUT /user/password
Schimbare parolă

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!",
  "new_password_confirmation": "NewPassword123!"
}
```

---

## 🛍️ COMENZI

### GET /user/orders
Lista comenzi utilizator

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_number": "2025001",
      "status": "delivered",
      "total_amount": 2500.00,
      "currency": "RON",
      "created_at": "2025-11-10T10:00:00Z",
      "items": [
        {
          "product_name": "Cupolă Decorativă Solară",
          "quantity": 1,
          "unit_price": 2500.00,
          "image": "https://..."
        }
      ]
    }
  ]
}
```

### GET /user/orders/{id}
Detalii comandă specifică

**Headers:** `Authorization: Bearer {token}`

---

## ⚙️ SETĂRI

### GET /user/settings
Obține setări utilizator

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "email_notifications": true,
    "newsletter": false,
    "two_factor_enabled": false
  }
}
```

### PUT /user/settings
Actualizare setări

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "email_notifications": true,
  "newsletter": true,
  "two_factor_enabled": false
}
```

---

## 📧 SUPORT

### POST /support/message
Trimite mesaj suport

**Headers:** `Authorization: Bearer {token}` (opțional)

**Request:**
```json
{
  "name": "Ion Popescu",
  "email": "user@example.com",
  "subject": "Întrebare despre produs",
  "message": "Aș dori să știu mai multe despre..."
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Mesaj trimis cu succes! Vă vom răspunde în curând."
}
```

---

## 🔒 SECURITATE & ERORI

### Headers Obligatorii
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}  // pentru endpoint-uri protejate
```

### Coduri Status HTTP
- `200` - Success
- `201` - Created
- `400` - Bad Request (validare eșuată)
- `401` - Unauthorized (token invalid/expirat)
- `403` - Forbidden (fără permisiuni)
- `404` - Not Found
- `422` - Unprocessable Entity (erori validare)
- `429` - Too Many Requests (rate limit)
- `500` - Server Error

### Format Eroare
```json
{
  "success": false,
  "message": "Eroare validare",
  "errors": {
    "email": ["Email-ul este obligatoriu"],
    "password": ["Parola trebuie să aibă minim 8 caractere"]
  }
}
```

---

## 📊 ADMIN PANEL API

### GET /admin/users
Lista utilizatori (doar admin)

### GET /admin/orders
Lista toate comenzile (doar admin)

### GET /admin/support
Lista mesaje suport (doar admin)

### GET /admin/stats
Statistici dashboard (doar admin)

---

**IMPLEMENTARE:** Toate endpoint-urile trebuie să returneze răspunsuri în limba utilizatorului (header `Accept-Language` sau user.language din DB).
