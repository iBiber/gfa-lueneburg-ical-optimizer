<template>
  <div>
    <h4 style="margin-top: 5px; margin-bottom: 10px;">Ergebnis</h4>
    <div v-if="eventDataStore.state.setAlarm">
      Alarm wird gesetzt auf {{ 24 - eventDataStore.state.hoursForAlarm }} Uhr (-{{
        eventDataStore.state.hoursForAlarm
      }}h) am Tag vorher.
    </div>
    <div v-else>
      Es werden keine Erinnerungen gesetzt.
    </div>
    <div>
      <div>
        Termine:
      </div>
      <div v-if="eventDataStore.state.isValid">
        <q-list>
          <q-item
            v-for="(item, index) in appointments"
            :key="index"
          >
            <q-item-section>
              <q-item-label> {{ new Date(item.startDate).toDateString() }}</q-item-label>
              <q-item-label caption lines="2">{{ item.summary }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from "vue";

export default {
  setup() {
    const eventDataStore = inject("EventDataStore");

    return {
      eventDataStore,
      appointments: computed(() => {
        const appointments = [...eventDataStore.getComputedEvents.value]
        appointments.sort(function (a, b) {
          return a.startDate.toString().localeCompare(b.startDate.toString())
        })
        return appointments
      })
    };
  },
};
</script>

<style></style>
