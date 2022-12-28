import { computed, reactive } from 'vue'
import ICAL from 'ical.js'
import cloneDeep from 'lodash.clonedeep'

const state = reactive({
  isValid: false,
  appointmentSummaries: [],
  selectedSummaries: [],
  grouping: true,
  setAlarm: true,
  hoursForAlarm: 8,
  iCalendar: {},
  iEvents: []
})

const getComputedEvents = computed(() => {
  // Create a clone of the array
  let iEvents = cloneDeep(state.iEvents.value)
  console.log('Number of events to compute: ' + iEvents.length)

  // Apply filter
  iEvents = iEvents.filter(
    (ievent) => state.selectedSummaries.value.includes(ievent.summary)
  )
  console.log('Number of events after applying filter: ' + iEvents.length)

  // Group Events
  if (state.grouping) {
    const eventsGroupedByStartDate = groupBy(iEvents, 'startDate')
    iEvents = Object.values(eventsGroupedByStartDate).map(
      (value) =>
        createGroupedEvent(
          value
        ) /* first element is the date and the second element is the list of events */
    )
    console.log('Number of events after grouping: ' + iEvents.length)
  }

  if (state.setAlarm) {
    // Setting an alarm at 16:00 a day before
    console.log('Defining alarms')
    iEvents.forEach((ievent) => replaceAlarm(ievent))
  }
  return iEvents
})

function loadFromFile (newFile) {
  state.isValid = false
  handleFileSelectInputField(newFile)
    .then((result) => {
      console.log('Reading finished, preparing store')
      state.iCalendar.value = result
      state.iEvents.value = getEvents(result)
      state.appointmentSummaries.value = getDistinctSummaryList(
        state.iEvents.value
      )
      state.selectedSummaries.value = [...state.appointmentSummaries.value]
      state.isValid = true
    })
    .catch(() => {
      state.isValid = false
    })
}

function generateIcalFile () {
  const newCal = cloneDeep(state.iCalendar.value)
  newCal.removeAllSubcomponents('vevent')
  const events = getComputedEvents
  events.value.forEach(ievent => newCal.addSubcomponent(ievent.component))

  // Create a blob object
  const oBlob = new Blob([newCal.toString()], { type: 'text/plain' })

  // Create a download link
  const elLink = document.createElement('a')

  // Create URL and assign it to the HTML element
  elLink.href = window.URL.createObjectURL(oBlob)
  elLink.download = 'new.ics'

  // Click on it do initiate the download
  elLink.click()

  URL.revokeObjectURL(elLink.href)
}

export default {
  state,
  loadFromFile,
  getComputedEvents,
  generateIcalFile
}

function parseIcsFile (reader, theFile) {
  console.log('Reading ics data from ' + theFile.name)
  const iCalText = reader.result
  console.log('Reading done: ' + iCalText.substring(0, 200) + ' ...')

  console.log('Parsing ics data')
  const jcalData = ICAL.parse(iCalText)
  console.log('Parsing ics data done')
  return jcalData
}

function getEvents (iCalendar) {
  const events = iCalendar
    .getAllSubcomponents('vevent') //
    .map((value) => {
      return new ICAL.Event(value)
    })
  console.log('Found ' + events.length + ' events')
  return events
}

function getDistinctSummaryList (events) {
  // Gather a distinct list of summaries
  const uniqueItems = Array.from(
    new Set(
      events.map((value) => {
        return value.summary
      })
    )
  )

  return uniqueItems.sort()
}

function handleIcsEvents (reader, theFile) {
  // Iterate over all events and transform them into VEvent objects
  const iCalendar = new ICAL.Component(parseIcsFile(reader, theFile))
  return iCalendar
}

async function handleFileSelectInputField (file) {
  console.log(
    escape(file.name) + //
      '(' +
      file.type ||
      'n/a' +
        ') - ' +
        file.size +
        ' bytes, last modified: ' +
        new Date(file.lastModified).toDateString()
  )

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (theFile) => {
      resolve(handleIcsEvents(reader, theFile))
    }

    // Start reading of file
    reader.readAsText(file)
  })
}

function replaceAlarm (event) {
  event.component.removeAllSubcomponents('valarm')

  var valarm = new ICAL.Component('valarm')
  valarm.addPropertyWithValue('trigger', '-PT' + state.hoursForAlarm + 'H')
  valarm.addPropertyWithValue('action', 'DISPLAY')
  valarm.addPropertyWithValue('description', 'Reminder')

  event.component.addSubcomponent(valarm)

  return event
}

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  )

function createGroupedEvent (events) {
  // Take any event as the main event and join the summaries into one summary
  var event = events[0]

  var summaries = Array.from(new Set(events.map((value) => value.summary))) // Distinct list of summaries
  var newSummary = summaries.join('; ')

  event.summary = newSummary

  return event
}
