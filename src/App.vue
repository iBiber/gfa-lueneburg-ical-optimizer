<template>
  <q-layout>
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title> GfA Kalender Aufbereitung </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-sm">
        <q-card>
          <q-card-section>
            <Descriptions />
          </q-card-section>
        </q-card>  
        <q-card>
          <q-card-section>
            <FileSelector />
          </q-card-section>
        </q-card>
        <q-card v-if="EventDataStore.state.isValid">
          <q-card-section>
            <ResultView />
          </q-card-section>
        </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import Descriptions from "./components/Descriptions.vue";
import FileSelector from "./components/FileSelector.vue";
import ResultView from "./components/ResultView.vue";
import store from "./store/FileStore";
import EventDataStore from "./store/EventDataStore";

export default {
  name: "LayoutDefault",
  provide: {
    store,
    EventDataStore,
  },
  inject: {
    
  },
  components: {
    Descriptions,
    FileSelector,
    ResultView,
  },
  setup() {
    return {
      EventDataStore,
    };
  }
};
</script>
