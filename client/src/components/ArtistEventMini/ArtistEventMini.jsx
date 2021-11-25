import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimeWithOffset } from '../../helpers/formatTimeWithOffset';

import './ArtistEventMini.scss';

const EventMini = (props) => {
  return (
    <div>
      {props.nowEvents.map((event, index) => {
        return (
          <div key={index}>
            {event.map((subitem, i) => {
              return (
                <div key={i} className={'events-now'}>
                  <Link to={`/event/${subitem._id}`}>
                    <p>
                      <span>Title:</span> {subitem.title}
                    </p>
                    <p>
                      <span>Description:</span> {subitem.description}
                    </p>
                    <p>
                      <span>Date:</span> {subitem.date.split('T')[0]}{' '}
                    </p>
                    <p>
                      <span>Time:</span>{' '}
                      {formatTimeWithOffset(subitem.date.substring(11, 16))}
                    </p>
                    <p>
                      <span>Duration:</span> {subitem.duration} min
                    </p>
                    <p>
                      <span>Genre:</span> {subitem.genre}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
      {props.events.map((event, index) => {
        return (
          <div key={index}>
            {event.map((subitem, i) => {
              return (
                <div key={i} className={'artist-events'}>
                  <Link to={`/event/${subitem._id}`}>
                    <p>
                      <span>Title:</span> {subitem.title}
                    </p>
                    <p>
                      <span>Description:</span> {subitem.description}
                    </p>
                    <p>
                      <span>Date:</span> {subitem.date.split('T')[0]}{' '}
                    </p>
                    <p>
                      <span>Time:</span>{' '}
                      {formatTimeWithOffset(subitem.date.substring(11, 16))}
                    </p>
                    <p>
                      <span>Duration:</span> {subitem.duration} min
                    </p>
                    <p>
                      <span>Genre:</span> {subitem.genre}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default EventMini;
