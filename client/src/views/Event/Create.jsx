import { Component } from 'react';
import { createEvent } from '../../services/event';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import MapOverlay from '../../components/MapOverlay/MapOverlay';

import './Event.scss';

class CreateEventView extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Event Name',
      duration: 1,
      description: 'Event Description',
      genres: ['genre-arabic', 'genre-blues'],
      showMap: false,
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    const { title, duration, description, genres, location } = this.state;
    console.log(title, duration, description, genres, location);
    // createEvent({ title, duration, description, genres, location })
    //   .then((event) => {
    //     console.log(event);
    //     this.props.history.push('/event/list');
    //   })
    //   .catch((error) => {
    //     alert('There was an error creating event.');
    //     console.log(error);
    //   });
  };

  handleGenreSelectionChange = (genres) => {
    this.setState({ genres });
  };

  handleMapToggle = () => {
    this.setState((prevState) => {
      return { showMap: !prevState.showMap };
    });
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  render() {
    return (
      <div>
        {(!this.state.showMap && (
          <div className="CreateEventView">
            <h1>Create Event</h1>

            <form
              onSubmit={this.handleFormSubmission}
              className="CreateEventView_content_form"
            >
              <h3>Details</h3>
              <div className="CreateEventView_inputs">
                <label htmlFor="event-title">Title</label>
                <input
                  id="event-title"
                  name="title"
                  type="text"
                  placeholder="Title for event"
                />
              </div>
              <div className="CreateEventView_inputs">
                <label htmlFor="event-description"></label>
                <textarea
                  id="event-description"
                  name="description"
                  placeholder="Add more info about your event"
                  rows="5"
                  maxLength="140"
                ></textarea>
              </div>
              <div className="CreateEventView_inputs">
                <label htmlFor="event-title">Duration (minutes)</label>
                <input
                  id="event-duration"
                  name="duration"
                  type="number"
                  placeholder="Duration of the event"
                />
              </div>

              <h3>Location</h3>
              <button onClick={this.handleMapToggle}>Select Location</button>

              <h3>Genres</h3>

              <GenreCheckbox
                options={[
                  { value: 'genre-african', label: 'African' },
                  { value: 'genre-arabic', label: 'Arabic' },
                  { value: 'genre-axe', label: 'Axé' },
                  { value: 'genre-blues', label: 'Blues' },
                  {
                    value: 'genre-bollywood-indian',
                    label: 'Bollywood & Indian'
                  },
                  { value: 'genre-classical', label: 'Classical' },
                  { value: 'genre-rock', label: 'Rock' }
                ]}
                selected={this.state.genres}
                onSelectedChange={this.handleGenreSelectionChange}
              />

              <button>Create Event</button>
            </form>
          </div>
        )) || (
          <MapOverlay
            onClose={this.handleMapToggle}
            onConfirmation={this.handleLocationChange}
          />
        )}
      </div>
    );
  }
}

export default CreateEventView;
