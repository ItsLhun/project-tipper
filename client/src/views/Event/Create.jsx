import { Component } from 'react';
import { createEvent } from '../../services/event';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';

class EventCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Event Name',
      duration: 1,
      description: 'Event Description',
      genres: ['rock', 'blues']
    };
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    const { title, duration, description, genres } = this.state;
    createEvent({ title, duration, description, genres })
      .then((event) => {
        console.log(event);
        this.props.history.push('/event/list');
      })
      .catch((error) => {
        alert('There was an error creating event.');
        console.log(error);
      });
  };

  handleGenreSelectionChange = (genres) => {
    this.setState({ genres });
  };

  render() {
    return (
      <div>
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
          <button>Add Location</button>

          <label htmlFor="event-description"></label>
          <textarea
            id="event-description"
            name="event"
            placeholder="Add more info about your event"
          ></textarea>

          <hr />
          <h3>Genres</h3>

          <GenreCheckbox
            options={[
              { value: 'genre-african', label: 'African' },
              { value: 'genre-arabic', label: 'Arabic' },
              { value: 'genre-axe', label: 'Axé' },
              { value: 'genre-blues', label: 'Blues' },
              { value: 'genre-bollywood-indian', label: 'Bollywood & Indian' },
              { value: 'genre-classical', label: 'Classical' },
              { value: 'genre-rock', label: 'Rock' }
            ]}
            selected={this.state.genres}
            onSelectedChange={this.handleGenreSelectionChange}
          />

          <button>Create Event</button>
        </form>
      </div>
    );
  }
}

export default EventCreate;
