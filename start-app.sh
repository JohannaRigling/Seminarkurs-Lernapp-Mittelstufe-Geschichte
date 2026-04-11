#!/bin/bash
# HistoLearn - App starten
echo "HistoLearn wird gestartet..."
cd "$(dirname "$0")"
python3 server.py &
SERVER_PID=$!
sleep 1
xdg-open http://localhost:8080
echo "App läuft auf http://localhost:8080"
echo "Zum Beenden: Strg+C drücken"
wait $SERVER_PID
