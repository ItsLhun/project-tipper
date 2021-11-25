import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listEvents } from './../../services/event';

function EventList(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    listEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  return (
    <div>
      <h1>Here is the LIST event{EventList.map}</h1>

      <ul>
        {EventList.map((events) => (
          <li key={events._id}>
            <Link to={`/course/${events._id}/manage`}>{events.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
