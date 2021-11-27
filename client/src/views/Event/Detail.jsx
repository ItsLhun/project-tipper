import React, { useState, useEffect } from 'react';
import { listEventDetail } from '../../services/event';
import GenreBlob from '../../components/GenreBlob/GenreBlob';

import './Event.scss';

function EventDetail(props) {
  const [event, setEvent] = useState();

  useEffect(() => {
    // listEventDetail();
    getEvent();
  }, [props.match.params.id]);

  const getEvent = async () => {
    console.log(event);
    console.log('match', props.match.params);
    try {
      const event = await listEventDetail(props.match.params.id);
      setEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EventDetailView">
      <div>
        Here is the DETAIL event
        <h1>{event?.title}</h1>
        <h3>Location</h3>
        <p>add here location</p>
        <h3>Description</h3>
        <p>{event?.description}</p>
        <h3>Date</h3>
        <p>{event?.date}</p>
        <p>{event?.duration}</p>
        <h3>Genres</h3>
        <p>
          {event?.genre.map((genre) => {
            const gen = { value: genre, label: genre };
            return <GenreBlob key={gen.value} genre={gen} />;
          })}
        </p>
        <h3>Artist</h3>
        <p>{event?.artist}</p>
      </div>
    </div>
  );
}

export default EventDetail;
