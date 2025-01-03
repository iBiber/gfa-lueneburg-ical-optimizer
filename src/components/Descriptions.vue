<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator label="Übersicht">
        <q-card class="content-padding">
          Dies ist ein Tool zur Optimierung der iCal-Dateien der GFA-Lüneburg.<br />
          Die Funktionen umfassen:
          <ol>
            <li>Hinzufügen von Alarmen zu einer bestimmten Uhrzeit vor dem Entsorgungstermin</li>
            <li>Das Entfernen von Abholungsarten</li>
            <li>Das Gruppieren von mehreren Abholungsarten an einem Tag zu einem Termin</li>
            <li><b>Dieses Tool läuft lokal in Ihrem Browser - es werden keine Daten ins Internet übertragen</b></li>
          </ol>
        </q-card>
      </q-expansion-item>
      <q-expansion-item expand-separator label="Anleitung">
        <q-card class="content-padding">
          <ol>
            <li>Den <a href="https://www.gfa-lueneburg.de/service/abfuhrkalender.html" target="_blank">GfA Abfuhrkalender</a> öffnen und den Standort eingeben.
          Auf weiter drücken und dann dort die "Leerungstermine" als <b>"ical-Kalenderdatei"</b> herunterladen.</li>
            <li>Diese Datei hier einfügen, die gewünschten Optionen wählen und eine neue ical-Kalenderdatei erstellen lassen.</li>
            <li>Diese neue Datei kann nun in einer Kalender-App importiert werden.</li>
          </ol>
        </q-card>
      </q-expansion-item>
      <q-expansion-item expand-separator label="Hinweis / Quellen">
        <q-card class="content-padding">
          Dieses Tool ist Open Source. Das Projekt inklusive der Quellen finden sie auf <a href="https://github.com/iBiber/gfa-lueneburg-ical-optimizer" target="_blank">https://github.com/iBiber/gfa-lueneburg-ical-optimizer</a>.
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<style>
.content-padding {
  padding: 16px;
}
</style>
