# gf-lueneburg-ical-optimizer
gf-lueneburg-ical-optimizer ist ein Tool, das die iCal-Dateien der GFA-Lüneburg optimiert.

Gehe auf https://ibiber.github.io/gfa-lueneburg-ical-optimizer/ um das Tool einfach zu verwenden.

Features sind:
* Hinzufügen von Alarmen zu einer bestimmten Uhrzeit vor dem Entsorgungstermin
* Das Entfernen von bestimmten Abholungsarten
* Das Gruppieren von mehreren Abholungsarten an einem Tag zu einem Termin
* **Es werden von der UI keinerlei Daten ins Internet geladen**

## Technische Details
Dieses Projekt verwendet NodeJs und Vue, um eine UI zu bauen und github-actions, um die UI auf github-pages zu deployen.  
Die UI kann natürlich auch lokal gebaut und gehostet werden. Während der Entwicklung wird der nodejs dev-server empfohlen, den man per `npm run serve` (im Projekt-Root-Ordner) starten kann.

## How to develop
Systemanforderungen:
* NodeJS muss verfügbar sein

Prepare:
1. Repo clonen
2. Dependencies herunterladen / aktualisieren:
```
npm install
```

UI lokal testen:
```
npm run serve
```

Build for production:
```
npm run build
```
