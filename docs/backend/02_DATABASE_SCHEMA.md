# 💾 SCHEMA BAZĂ DE DATE
## MC MetSolArt - Database Structure

---

## 📊 TABELE PRINCIPALE

### 1. `users` - Utilizatori
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    company VARCHAR(255) NULL,
    avatar VARCHAR(500) NULL,
    role ENUM('user', 'admin', 'super_admin') DEFAULT 'user',
    email_verified_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    language VARCHAR(5) DEFAULT 'ro',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. `user_addresses` - Adrese Livrare
```sql
CREATE TABLE user_addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    address_type ENUM('billing', 'shipping', 'both') DEFAULT 'shipping',
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    county VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    country VARCHAR(100) DEFAULT 'România',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_default (is_default)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3. `user_contacts` - Contact Suplimentar
```sql
CREATE TABLE user_contacts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    alternative_phone VARCHAR(20) NULL,
    whatsapp VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 4. `orders` - Comenzi
```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RON',
    shipping_address_id BIGINT UNSIGNED NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shipping_address_id) REFERENCES user_addresses(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 5. `order_items` - Produse din Comenzi
```sql
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500) NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 6. `user_settings` - Setări Utilizator
```sql
CREATE TABLE user_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    newsletter BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 7. `password_resets` - Resetare Parolă
```sql
CREATE TABLE password_resets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 8. `support_messages` - Mesaje Suport
```sql
CREATE TABLE support_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    admin_response TEXT NULL,
    responded_by BIGINT UNSIGNED NULL,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (responded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 9. `email_logs` - Log Emailuri Trimise
```sql
CREATE TABLE email_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    email_to VARCHAR(255) NOT NULL,
    email_type VARCHAR(50) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    status ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
    error_message TEXT NULL,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_email_type (email_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 10. `activity_logs` - Log Activități
```sql
CREATE TABLE activity_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔗 RELAȚII ÎNTRE TABELE

```
users (1) ──→ (N) user_addresses
users (1) ──→ (1) user_contacts
users (1) ──→ (N) orders
users (1) ──→ (1) user_settings
users (1) ──→ (N) support_messages
users (1) ──→ (N) activity_logs

orders (1) ──→ (N) order_items
orders (N) ──→ (1) user_addresses (shipping)
```

---

## 📝 DATE INIȚIALE (SEED DATA)

### Admin User
```sql
INSERT INTO users (email, password, first_name, last_name, role, email_verified_at) 
VALUES (
    'admin@mcmetsolart.com',
    '$2y$12$[HASH_PAROLA]', -- Parola: Admin@2025
    'Admin',
    'MC MetSolArt',
    'super_admin',
    NOW()
);
```

### User Demo
```sql
INSERT INTO users (email, password, first_name, last_name, email_verified_at) 
VALUES (
    'test@test.com',
    '$2y$12$[HASH_PAROLA]', -- Parola: test123
    'Test',
    'User',
    NOW()
);
```

---

## 🔍 INDEXURI PENTRU PERFORMANȚĂ

```sql
-- Căutare utilizatori după email
CREATE INDEX idx_users_email ON users(email);

-- Filtrare comenzi după status
CREATE INDEX idx_orders_status ON orders(status);

-- Sortare comenzi după dată
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Căutare mesaje suport după status
CREATE INDEX idx_support_status ON support_messages(status);

-- Log-uri activități recente
CREATE INDEX idx_activity_created_at ON activity_logs(created_at DESC);
```

---

## 🔐 SECURITATE BAZĂ DE DATE

### Utilizatori DB
```sql
-- User pentru aplicație (read/write)
CREATE USER 'mc_app'@'localhost' IDENTIFIED BY '[PAROLA_PUTERNICA]';
GRANT SELECT, INSERT, UPDATE, DELETE ON mc_metsolart.* TO 'mc_app'@'localhost';

-- User pentru backup (read only)
CREATE USER 'mc_backup'@'localhost' IDENTIFIED BY '[PAROLA_PUTERNICA]';
GRANT SELECT ON mc_metsolart.* TO 'mc_backup'@'localhost';

FLUSH PRIVILEGES;
```

---

## 💾 BACKUP AUTOMAT

### Script Backup Zilnic
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u mc_backup -p mc_metsolart > /backups/mc_metsolart_$DATE.sql
gzip /backups/mc_metsolart_$DATE.sql

# Păstrează doar ultimele 30 de zile
find /backups -name "mc_metsolart_*.sql.gz" -mtime +30 -delete
```

---

**NEXT:** Citește **03_API_ENDPOINTS.md** pentru toate endpoint-urile API.
