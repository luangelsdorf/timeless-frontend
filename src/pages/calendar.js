import React from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {

  function handleClick(info) {
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = 'red';
  }

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      dateClick={handleClick}
      eventStartEditable
      initialView='dayGridMonth'
      nowIndicator={true}
      editable={true}
      initialEvents={[
        { title: 'nice event', start: new Date() }
      ]}
    />
  )
}