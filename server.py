#!/usr/bin/env python3
"""
HistoLearn - Lokaler Server mit API-Proxy
Startet einen Webserver für die App UND leitet Claude API-Anfragen weiter.
"""

import http.server
import json
import urllib.request
import urllib.error
import os
import sys

PORT = 8080
APP_DIR = os.path.join(os.path.dirname(__file__), 'app')

# API-Key aus config.js lesen
def get_api_key():
    config_path = os.path.join(APP_DIR, 'js', 'config.js')
    try:
        with open(config_path, 'r') as f:
            content = f.read()
        import re
        match = re.search(r"apiKey:\s*'([^']+)'", content)
        if match:
            return match.group(1)
    except:
        pass
    return None

API_KEY = get_api_key()

class HistoLearnHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def do_POST(self):
        if self.path == '/api/messages':
            self.proxy_to_anthropic()
        else:
            self.send_error(404)

    def proxy_to_anthropic(self):
        if not API_KEY:
            self.send_error(500, 'API-Key nicht gefunden')
            return

        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        req = urllib.request.Request(
            'https://api.anthropic.com/v1/messages',
            data=body,
            headers={
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            method='POST'
        )

        try:
            with urllib.request.urlopen(req) as resp:
                response_body = resp.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_body)
        except urllib.error.HTTPError as e:
            error_body = e.read()
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(error_body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        # Nur API-Anfragen loggen, nicht jeden Datei-Request
        if '/api/' in (args[0] if args else ''):
            print(f"[API] {args[0]}")

if __name__ == '__main__':
    if not API_KEY:
        print("FEHLER: API-Key nicht gefunden in app/js/config.js")
        sys.exit(1)

    print(f"HistoLearn läuft auf http://localhost:{PORT}")
    print("Zum Beenden: Strg+C\n")

    server = http.server.HTTPServer(('localhost', PORT), HistoLearnHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gestoppt.")
