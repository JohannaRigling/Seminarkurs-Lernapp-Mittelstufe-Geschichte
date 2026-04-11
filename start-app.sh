#!/bin/bash
# HistoLearn - App starten
echo "HistoLearn wird gestartet..."
cd "$(dirname "$0")/app"
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 1
xdg-open http://localhost:8080
echo "App läuft auf http://localhost:8080"
echo "Zum Beenden: Strg+C drücken"
wait $SERVER_PID
