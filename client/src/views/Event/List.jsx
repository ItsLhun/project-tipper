import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listEvents } from './../../services/event';

function EventList(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    listEvents()
      .then((events) => {
        console.log(events);
        setEvents(events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Here is the LIST event</h1>

      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/event/${event._id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
