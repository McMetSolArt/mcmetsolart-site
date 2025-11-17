# MC MetSolArt Backend API

Backend profesional Flask pentru sistemul de cont MC MetSolArt.

## 🚀 Instalare și Pornire

### 1. Instalează dependențele

```bash
pip install -r requirements.txt
```

### 2. Pornește serverul

```bash
python app.py
```

Serverul va porni pe: **http://localhost:5000**

## 📡 API Endpoints

### Autentificare

#### POST /api/auth/register
Înregistrare utilizator nou

**Request:**
```json
{
  "email": "user@example.com",
  "password": "parola123",
  "first_name": "Ion",
  "last_name": "Popescu",
  "language": "ro"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cont creat cu succes",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Ion",
      "lastName": "Popescu",
      "avatar": "...",
      "language": "ro",
      "role": "user"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

#### POST /api/auth/login
Autentificare utilizator

**Request:**
```json
{
  "email": "user@example.com",
  "password": "parola123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Autentificare reușită",
  "data": {
    "user": { ... },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

#### POST /api/auth/logout
Deconectare utilizator (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

### Profil Utilizator

#### GET /api/user/profile
Obține profilul utilizatorului curent (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Ion",
      "lastName": "Popescu",
      "phone": "+40 123 456 789",
      "company": "MC MetSolArt",
      "address": "Strada Exemplu, Nr. 123",
      "city": "București",
      ...
    }
  }
}
```

#### PUT /api/user/profile
Actualizează profilul utilizatorului (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "phone": "+40 123 456 789",
  "company": "MC MetSolArt",
  "address": "Strada Exemplu, Nr. 123",
  "city": "București",
  "postalCode": "010101",
  "county": "București",
  "country": "România",
  "alternativePhone": "+40 987 654 321",
  "whatsapp": "+40 123 456 789",
  "language": "ro"
}
```

### Comenzi

#### GET /api/user/orders
Obține comenzile utilizatorului (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1,
        "orderNumber": "ORD-2025-001",
        "status": "delivered",
        "totalAmount": 1250.00,
        "currency": "RON",
        "paymentMethod": "card",
        "createdAt": "2025-01-15T10:30:00",
        "items": [
          {
            "productName": "Produs 1",
            "quantity": 2,
            "price": 625.00
          }
        ]
      }
    ]
  }
}
```

### Setări

#### GET /api/user/settings
Obține setările utilizatorului (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "settings": {
      "emailNotifications": true,
      "smsNotifications": false,
      "newsletter": true,
      "twoFactorAuth": false
    }
  }
}
```

#### PUT /api/user/settings
Actualizează setările utilizatorului (necesită token JWT)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "emailNotifications": true,
  "smsNotifications": false,
  "newsletter": true,
  "twoFactorAuth": false
}
```

### Suport

#### POST /api/support/message
Trimite mesaj către suport (nu necesită autentificare)

**Request:**
```json
{
  "name": "Ion Popescu",
  "email": "user@example.com",
  "subject": "Întrebare despre produs",
  "message": "Aș dori să aflu mai multe despre..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mesaj trimis cu succes. Vă vom răspunde în cel mai scurt timp."
}
```

## 🔐 Securitate

- **JWT Tokens**: Toate endpoint-urile protejate necesită token JWT în header
- **Password Hashing**: Parolele sunt criptate cu Werkzeug (bcrypt)
- **CORS**: Configurat pentru a permite cereri de la frontend
- **Validare**: Toate datele sunt validate înainte de procesare

## 📊 Baza de Date

Backend-ul folosește **SQLite** cu următoarele tabele:

- **users** - Utilizatori
- **orders** - Comenzi
- **order_items** - Produse din comenzi
- **user_settings** - Setări utilizatori
- **support_messages** - Mesaje suport
- **password_resets** - Token-uri resetare parolă

## 🔧 Configurare Frontend

API Client-ul din frontend (`js/api-client.js`) este deja configurat să se conecteze la acest backend.

Asigură-te că backend-ul rulează pe **http://localhost:5000** sau actualizează `API_BASE_URL` în `api-client.js`.

## 📝 Testare

### Test înregistrare:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123",
    "first_name": "Test",
    "last_name": "User",
    "language": "ro"
  }'
```

### Test autentificare:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }'
```

## 🚀 Producție

Pentru producție, recomandăm:

1. **Gunicorn** pentru server WSGI
2. **Nginx** pentru reverse proxy
3. **PostgreSQL** în loc de SQLite
4. **Redis** pentru cache și sesiuni
5. **SSL Certificate** (Let's Encrypt)

## 📞 Suport

Pentru întrebări sau probleme, contactați echipa MC MetSolArt.
