import React from 'react';

const EventMini = (props) => {
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
