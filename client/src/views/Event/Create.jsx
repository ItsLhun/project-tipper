import React from 'react';
import { createEvent } from '../../services/event';

const handleFormSubmission = (event) => {
  event.preventDefault();
  const { title, location, description, genres, episodes } = this.state;
  createEvent({ title, description, episodes })
    .then((course) => {
      this.props.history.push('/events');
    })
    .catch((error) => {
      alert('There was an error creating course.');
      console.log(error);
    });
};

function EventCreate() {
  return (
    <>
      <h1>Create Event</h1>
      <form onSubmit={this.handleFormSubmission}>
        <label htmlFor="event-title">Title</label>
        <input
          id="event-title"
          name="title"
          type="text"
          placeholder="Title for event"
        />

        <h3>Location</h3>
        <label htmlFor="event-city"></label>
        <input id="event-city" name="city" type="text" placeholder="City" />
        <label htmlFor="event-state"></label>
        <input
          id="event-state"
          name="state"
          type="text"
          placeholder="State or County"
        />
        <label htmlFor="event-country"></label>
        <input
          id="event-country"
          name="country"
          type="text"
          placeholder="Country"
        />

        <label htmlFor="event-description"></label>
        <textarea
          id="event-description"
          name="event"
          placeholder="Add more info about your event"
        ></textarea>

        <hr />
        <h3>Genres</h3>
        <input
          type="checkbox"
          name="genre-african"
          id="genre-african"
          value="African"
        />
        <label htmlFor="">African</label>
        <input
          type="checkbox"
          name="genre-arabic"
          id="genre-arabic"
          value="Arabic"
        />
        <label htmlFor="">Arabic</label>
        <label htmlFor="">African</label>
        <input type="checkbox" name="genre-axe" id="genre-axe" value="Axé" />
        <label htmlFor="">Axé</label>
        <input
          type="checkbox"
          name="genre-blues"
          id="genre-blues"
          value="Blues"
        />
        <label htmlFor="">Blues</label>
        <input
          type="checkbox"
          name="genre-bollywood-indian"
          id="genre-bollywood-indian"
          value="Bollywood & Indian"
        />
        <label htmlFor="">Bollywood * Indian</label>
        <input
          type="checkbox"
          name="genre-classical"
          id="genre-classical"
          value="Classical"
        />
        <label htmlFor="">Classical</label>

        <input type="checkbox" name="genre-rock" id="genre-rock" value="Rock" />
        <label htmlFor="">Rock</label>

        <button>Create Event</button>
      </form>
    </>
  );
}

export default EventCreate;
