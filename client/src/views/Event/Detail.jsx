import React, { useState, useEffect } from 'react';
import { listEventDetail } from '../../services/event';
import GenreBlob from '../../components/GenreBlob/GenreBlob';
import Minimap from '../../components/MiniMap/Minimap';
import './Event.scss';

function EventDetail(props) {
  const [event, setEvent] = useState();

  useEffect(() => {
    // listEventDetail();
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h1>Event Details</h1>
        <h2>{event?.title}</h2>
        <p>
          {event?.artist.firstName} {event?.artist.lastName}:{' '}
          {event?.description}
        </p>
        <h3>Location</h3>
        {/* Load google maps instance to pass the coordinates */}
        <Minimap
          mapContainerStyle={{
            width: '100%',
            height: '10rem'
          }}
          mapCenter={{
            lat: event?.location.coordinates[0],
            lng: event?.location.coordinates[1]
          }}
        />
        <h3>Date</h3>
        <p>{event?.date.split('T')[0]}</p>
        <p>Duration: {event?.duration} minutes</p>
        <h3>Genres</h3>
        <div>
          {event?.genre.map((genre) => {
            const gen = { value: genre, label: genre };
            return <GenreBlob key={gen.value} genre={gen} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
