import { reactive } from 'vue';
import eventDataStore from './EventDataStore';

export default {
  state: reactive({
    file: {}
  }),
  setFile (newFile) {
    eventDataStore.loadFromFile(newFile)
    this.state.file.value = newFile
  }
}
