#!/bin/bash

echo "========================================"
echo "  MC MetSolArt Backend Starter"
echo "========================================"
echo ""

# Verifică dacă virtual environment există
if [ ! -d "venv" ]; then
    echo "[!] Virtual environment nu există. Creez..."
    python3 -m venv venv
    echo "[+] Virtual environment creat!"
    echo ""
fi

# Activează virtual environment
echo "[*] Activez virtual environment..."
source venv/bin/activate

# Instalează dependențe
echo "[*] Verific dependențe..."
pip install -r requirements.txt --quiet

# Verifică dacă .env există
if [ ! -f ".env" ]; then
    echo ""
    echo "[!] ATENTIE: Fisierul .env nu exista!"
    echo "[*] Copiez .env.example la .env..."
    cp .env.example .env
    echo ""
    echo "[!] Te rog editeaza .env cu setarile tale!"
    echo ""
    read -p "Apasa Enter pentru a continua..."
fi

# Pornește aplicația
echo ""
echo "========================================"
echo "  Backend porneste pe http://localhost:5000"
echo "  Apasa Ctrl+C pentru a opri"
echo "========================================"
echo ""

python3 app.py
