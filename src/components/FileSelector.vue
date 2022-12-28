<template>
  <div>
    <h4>Anleitung</h4>
    Den <a href="https://www.gfa-lueneburg.de/service/abfuhrkalender.html" target="_blank">GfA Abfuhrkalender</a> öffnen und den Standort eingeben.
    Auf weiter drücken und dann dort die "Leerungstermine" als <b>"ical-Kalenderdatei"</b> herunterladen.
    Diese Datei hier einfügen, die Optionen wählen und eine neue ical-Kalenderdatei erstellen lassen.
    Diese neue Datei kann nun in einer Kalender-App importiert werden.
    <h4>Einstellungen</h4>
    <div>
      <div>Datei der GfA:</div>
      <q-file
        v-model="file"
        label="Wähle .ics Datei der GfA hier aus"
        filled
        accept=".ics"
        style="padding: 10px"
      />
    </div>
    <div>
      <div>Welche Termine sollen enthalten sein?</div>
      <q-option-group
        v-model="summarySelection"
        :options="summaryOptions"
        type="toggle"
      />
    </div>
    <div>
      <div>Sollen Termine am gleichen Tag zu einem Termin zusammengeführt werden?</div>
      <q-checkbox
        v-model="eventDataStore.state.grouping"
        label="Gruppiere Termine am gleichen Tag"
        :disable="disableIcsParseDependent"
      />
    </div>
    <div>
      <div>Soll eine Erinnerung am Tag vorher eingestellt werden?</div>
      <q-checkbox v-model="eventDataStore.state.setAlarm" label="Setze Erinnerung" />
      <q-input 
        v-model="hours"
        filled
        :disable="disableIcsParseDependent || !eventDataStore.state.setAlarm"
        label="Uhrzeit für die Erinnerung"
        type="number"
        suffix="Uhr"
        style="max-width: 250px"
        :rules="[ (val) => { return val <= 24 && val >= 0 || 'Nur Werte zwischen 0 und 24 sind erlaubt' } ]"
      />
    </div>
    <q-btn label="Erzeuge neue Kalenderdatei" @click="eventDataStore.generateIcalFile()" :disable="disableIcsParseDependent" />
  </div>
</template>

<script>
import {ref, computed, inject } from "vue";

export default {
  setup() {
    const store = inject("store");
    const eventDataStore = inject("EventDataStore");

    return {
      group:ref([]),
      store,
      eventDataStore,
      file: computed({
        get() {
          return store.state.file.value;
        },
        set(value) {
          store.setFile(value);
        },
      }),
      disableIcsParseDependent: computed(()=>{
        if(eventDataStore.state.isValid)
          return false
        else
          return true
      }),
      summaryOptions: computed(() => {
        if(eventDataStore.state.appointmentSummaries.value)
          return eventDataStore.state.appointmentSummaries.value.map(item => {
            return {
              label: item,
              value: item,
            }
          })
        else 
          return []
      }),
      summarySelection: computed({
        get() {
          if(eventDataStore.state.selectedSummaries.value)
            return eventDataStore.state.selectedSummaries.value
          else 
            return []
        },
        set(value) {
          eventDataStore.state.selectedSummaries.value = value
        }
      }),
      hours: computed({
        get() {
          return 24 - eventDataStore.state.hoursForAlarm
        },
        set(value) {
          eventDataStore.state.hoursForAlarm = 24 - value
        }
      })
    };
  },
};
</script>

<style></style>
