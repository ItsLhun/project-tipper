import React, { useState } from 'react';

const EventMini = (props) => {
  const [events, setEvents] = useState(props.events);

  return (
    <div>
      {props.events.map((event) => {
        return (
          <div key={event.title}>
            Title: {event.title}
            <br />
            Location: {event.location}
            <br />
            Date: {event.date}
          </div>
        );
      })}
    </div>
  );
};

export default EventMini;
