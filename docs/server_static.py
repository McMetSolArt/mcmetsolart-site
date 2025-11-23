# Server simplu pentru testare locala
# Ruleaza cu: python server_static.py

import http.server
import socketserver
import os

PORT = 4000
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(WEB_DIR)

Handler = http.server.SimpleHTTPRequestHandler

print(f"\nServer pornit pe http://localhost:{PORT}\nCtrl+C ca sa opresti.\n")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
