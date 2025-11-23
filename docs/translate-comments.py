#!/usr/bin/env python3
"""
Script pentru traducerea comentariilor din cod in romana naturala
Parcurge toate fisierele JS, CSS, Python si schimba comentariile
"""

import os
import re

# Dictionar cu traduceri comune
TRANSLATIONS = {
    # Engleza -> Romana naturala
    'Initialize': 'Porneste',
    'Configuration': 'Setari',
    'Setup': 'Configurare',
    'Function': 'Functie',
    'Helper': 'Ajutatoare',
    'Utility': 'Utilitara',
    'Main': 'Principal',
    'Start': 'Incepe',
    'End': 'Sfarsit',
    'Begin': 'Inceput',
    'Finish': 'Termina',
    'Complete': 'Gata',
    'Success': 'Succes',
    'Error': 'Eroare',
    'Warning': 'Atentie',
    'Info': 'Info',
    'Debug': 'Debug',
    'TODO': 'DE FACUT',
    'FIXME': 'DE REPARAT',
    'NOTE': 'NOTA',
    'IMPORTANT': 'IMPORTANT',
    'Check': 'Verifica',
    'Validate': 'Valideaza',
    'Update': 'Actualizeaza',
    'Delete': 'Sterge',
    'Remove': 'Elimina',
    'Add': 'Adauga',
    'Create': 'Creaza',
    'Get': 'Ia',
    'Set': 'Seteaza',
    'Load': 'Incarca',
    'Save': 'Salveaza',
    'Open': 'Deschide',
    'Close': 'Inchide',
    'Show': 'Arata',
    'Hide': 'Ascunde',
    'Toggle': 'Comuta',
    'Enable': 'Activeaza',
    'Disable': 'Dezactiveaza',
}

def translate_comment(comment):
    """Traduce un comentariu in romana naturala"""
    # Aici poti adauga logica de traducere
    # Pentru moment, doar inlocuieste cuvintele comune
    result = comment
    for eng, ro in TRANSLATIONS.items():
        result = re.sub(r'\b' + eng + r'\b', ro, result, flags=re.IGNORECASE)
    return result

def process_file(filepath):
    """Proceseaza un fisier si traduce comentariile"""
    print(f"Proceseaza: {filepath}")
    # Aici adaugi logica de procesare
    pass

def main():
    """Functia principala"""
    print("Script pentru traducere comentarii")
    print("Parcurg toate fisierele...")
    
    # Parcurge toate fisierele
    for root, dirs, files in os.walk('.'):
        # Ignora node_modules, .git, etc
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__', 'venv']]
        
        for file in files:
            if file.endswith(('.js', '.css', '.py')):
                filepath = os.path.join(root, file)
                process_file(filepath)
    
    print("Gata!")

if __name__ == '__main__':
    main()
