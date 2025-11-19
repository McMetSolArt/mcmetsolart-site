# Simple Python HTTP server for static site
# Rulează: python server_static.py

import http.server
import socketserver
import os

PORT = 4000
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(WEB_DIR)

Handler = http.server.SimpleHTTPRequestHandler

print(f"\nServer local pornit pe http://localhost:{PORT}\nApasă Ctrl+C pentru a opri.\n")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
