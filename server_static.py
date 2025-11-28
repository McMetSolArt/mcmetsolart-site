# Server simplu pentru testare locală
# Rulează cu: python server_static.py

import http.server
import socketserver
import os

PORT = 4000
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(WEB_DIR)

Handler = http.server.SimpleHTTPRequestHandler

print(f"\n🚀 Server Frontend pornit pe:")
print(f"   - Local: http://localhost:{PORT}")
print(f"   - Rețea: http://192.168.1.5:{PORT}")
print(f"\nCtrl+C pentru a opri.\n")

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    httpd.serve_forever()
