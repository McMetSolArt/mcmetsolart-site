@echo off
echo ========================================
echo   MC MetSolArt - Pornire Backend
echo ========================================
echo.

cd McMetSolArtBackend

echo Verificare Python...
python --version
if errorlevel 1 (
    echo.
    echo [EROARE] Python nu este instalat sau nu este in PATH!
    echo Te rugam sa instalezi Python 3.8+ de la python.org
    pause
    exit /b 1
)

echo.
echo Verificare dependinte...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo.
    echo Instalare dependinte...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo.
        echo [EROARE] Nu s-au putut instala dependintele!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Backend se porneste...
echo ========================================
echo.
echo Backend va rula pe: http://localhost:3000
echo.
echo Pentru a opri backend-ul, apasa Ctrl+C
echo.
echo ========================================
echo.

python app.py

pause
