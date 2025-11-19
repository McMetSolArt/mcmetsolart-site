@echo off
echo ========================================
echo   MC MetSolArt Backend Starter
echo ========================================
echo.

REM Verifică dacă virtual environment există
if not exist "venv\" (
    echo [!] Virtual environment nu există. Creez...
    python -m venv venv
    echo [+] Virtual environment creat!
    echo.
)

REM Activează virtual environment
echo [*] Activez virtual environment...
call venv\Scripts\activate.bat

REM Instalează dependențe
echo [*] Verific dependențe...
pip install -r requirements.txt --quiet

REM Verifică dacă .env există
if not exist ".env" (
    echo.
    echo [!] ATENTIE: Fisierul .env nu exista!
    echo [*] Copiez .env.example la .env...
    copy .env.example .env
    echo.
    echo [!] Te rog editeaza .env cu setarile tale!
    echo.
    pause
)

REM Pornește aplicația
echo.
echo ========================================
echo   Backend porneste pe http://localhost:5000
echo   Apasa Ctrl+C pentru a opri
echo ========================================
echo.

python app.py

pause
