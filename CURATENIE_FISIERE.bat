@echo off
echo ========================================
echo   CURĂȚENIE FIȘIERE - MC MetSolArt
echo ========================================
echo.

echo Ștergere fișiere de test și documentație inutile...
echo.

REM Fișiere HTML de test
del /Q TEST_BACKEND_COMPLET.html 2>nul
del /Q DEBUG_TOKEN.html 2>nul
del /Q test-token.html 2>nul
del /Q STERGE_TOKEN_ACUM.html 2>nul
del /Q RESET_SESIUNE.html 2>nul
del /Q test-final-FUNCTIONEAZA.html 2>nul
del /Q DESCHIDE_ACEASTA_PAGINA.html 2>nul
del /Q test-auth.html 2>nul
del /Q test-direct.html 2>nul
del /Q START.html 2>nul
del /Q diagnostic.html 2>nul
del /Q test-quick.html 2>nul
del /Q TEST_BUTON_SALVARE.html 2>nul
del /Q DEBUG_TOKEN_COMPLET.html 2>nul
del /Q START_TESTARE.html 2>nul
del /Q REZOLVA_TOKEN_ACUM.html 2>nul

REM Fișiere MD de documentație veche
del /Q SOLUTIE_FINALA_COMPLETA.md 2>nul
del /Q REZOLVARE_ERORI_COMPLETE.md 2>nul
del /Q CITESTE_ACUM.md 2>nul
del /Q SOLUTIE_SIMPLA_FINALA.md 2>nul
del /Q REZOLVARE_AUTOMATA_TOKEN.md 2>nul
del /Q RESETARE_SESIUNE.md 2>nul
del /Q BACKEND_PORNIT.md 2>nul
del /Q AVATAR_UPLOAD_COMPLET.md 2>nul
del /Q REPARATII_PROFIL_COMPLETE.md 2>nul
del /Q SOLUTIE_API_ERROR.md 2>nul
del /Q DESCHIDE_SITE_ACUM.md 2>nul
del /Q INSTRUCTIUNI_TESTARE_FINALE.md 2>nul
del /Q BUTON_SALVARE_REPARAT_FINAL.md 2>nul
del /Q SISTEM_FINAL_COMPLET.md 2>nul
del /Q BUTON_SALVARE_REPARAT.md 2>nul
del /Q DESCHIDE_AICI.md 2>nul
del /Q VERIFICARE_FINALA.md 2>nul
del /Q MODIFICARI_COMPLETE.md 2>nul
del /Q CITESTE_PRIMUL.md 2>nul
del /Q DESIGN_ELEGANT_FINAL.md 2>nul
del /Q PROBLEME_REZOLVATE_FINAL.md 2>nul
del /Q FORMULAR_CONTACT_INTEGRAT.md 2>nul
del /Q EMAIL_REAL_REZUMAT.md 2>nul
del /Q CONFIGURARE_EMAIL_REAL.md 2>nul
del /Q TRADUCERI_BACKEND_COMPLETE.md 2>nul
del /Q SISTEM_COMPLET_PROFESIONAL.md 2>nul
del /Q BACKEND_INTEGRATION_COMPLETE.md 2>nul
del /Q CITESTE_IMEDIAT.md 2>nul
del /Q VERIFICARE_FINALA_COMPLETA.md 2>nul
del /Q REZUMAT_FINAL_REZOLVARE.md 2>nul
del /Q INSTRUCTIUNI_FINALE_REZOLVARE.md 2>nul
del /Q REZOLVARE_TOKEN_INVALID_FINAL.md 2>nul
del /Q VERIFICARE_ACTUALIZARI_COMPLETE.md 2>nul
del /Q VERIFICA_ACUM.md 2>nul
del /Q SOLUTIE_FINALA_TOKEN.md 2>nul
del /Q CONVERSIE_TOKEN_PERMANENT_FINALIZATA.md 2>nul
del /Q TEST_TOKEN_BACKEND.md 2>nul
del /Q REZOLVARE_RAPIDA_TOKEN.md 2>nul
del /Q SOLUTIE_TOKEN_INVALID.md 2>nul

REM Fișiere BAT vechi
del /Q REPORNESTE_BACKEND_ACUM.bat 2>nul
del /Q REZOLVA_ACUM.bat 2>nul
del /Q TEST_TOKEN.bat 2>nul
del /Q ACTIVEAZA_TOKEN_PERMANENT.bat 2>nul
del /Q EXPORT_CSV.bat 2>nul

REM Backend - fișiere vechi
del /Q McMetSolArtBackend\app_simple.py 2>nul
del /Q McMetSolArtBackend\app_token_permanent.py 2>nul
del /Q McMetSolArtBackend\app_jwt_backup.py 2>nul
del /Q McMetSolArtBackend\app_jwt_vechi.py 2>nul
del /Q McMetSolArtBackend\app_jwt_old.py 2>nul
del /Q McMetSolArtBackend\app_old.py 2>nul
del /Q McMetSolArtBackend\test_api.py 2>nul
del /Q McMetSolArtBackend\test_token_debug.py 2>nul
del /Q McMetSolArtBackend\convert_to_permanent_token.py 2>nul
del /Q McMetSolArtBackend\fix_jwt_to_token.py 2>nul
del /Q McMetSolArtBackend\VERIFICARE_BACKEND.md 2>nul

echo.
echo ========================================
echo   ✅ CURĂȚENIE COMPLETĂ!
echo ========================================
echo.
echo Fișiere păstrate (esențiale):
echo.
echo FRONTEND:
echo   - index.html
echo   - css/ (toate stilurile)
echo   - js/ (toate scripturile)
echo   - docs/ (documentație utilă)
echo.
echo BACKEND:
echo   - McMetSolArtBackend/app.py (backend principal)
echo   - McMetSolArtBackend/check_users.py (verificare utilizatori)
echo   - McMetSolArtBackend/migrate_add_api_token.py (migrare DB)
echo   - McMetSolArtBackend/csv_export_simple.py (export CSV)
echo   - McMetSolArtBackend/mc_metsolart.db (baza de date)
echo   - McMetSolArtBackend/exports/ (fișiere CSV)
echo.
echo DOCUMENTAȚIE:
echo   - TOKEN_PERMANENT_IMPLEMENTAT.md (ghid token permanent)
echo   - BACKEND_TOKEN_PERMANENT_GATA.md (status final)
echo   - PORNESTE_BACKEND.bat (pornire backend)
echo   - START_HERE.md (ghid de start)
echo.
pause
