import { Component } from 'react';
import { createEvent } from '../../services/event';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import MapOverlay from '../../components/MapOverlay/MapOverlay';

import './Event.scss';

class CreateEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      time: '',
      duration: 5,
      description: '',
      genre: [],
      showMap: false,
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  handleGenreSelectionChange = (genre) => {
    this.setState({ genre });
  };

  handleMapToggle = () => {
    this.setState((prevState) => {
      return { showMap: !prevState.showMap };
    });
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  handleDateChange = (e) => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    this.setState({
      date: date.toISOString().split('T')[0]
    });
  };

  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };

  handleRightNowClick = () => {
    // account for timezone
    const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const date = new Date(Date.now() - timeOffset);
    console.log(this.state.date);
    this.setState({
      date: date.toISOString().split('T')[0],
      time: date.toISOString().split('T')[1]?.split('.')[0].slice(0, -3)
    });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmission = (e) => {
    e.preventDefault();
    const { title, date, time, duration, description, genre, location } =
      this.state;
    console.log(title, date, time, duration, description, genre, location);
    createEvent({ title, date, time, duration, description, genre, location })
      .then((event) => {
        console.log(event);
        this.props.history.push('/event/list');
      })
      .catch((error) => {
        alert('There was an error creating event.');
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {(!this.state.showMap && (
          <div className="CreateEventView">
            <h1>New Event</h1>

            <form
              onSubmit={this.handleFormSubmission}
              className="CreateEventView_content_form"
            >
              <h3>Details</h3>
              <div className="CreateEventView_inputs">
                <label htmlFor="event-date">When</label>
                <input
                  id="event-date"
                  name="duration"
                  type="date"
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  placeholder="Date of the event"
                />
                <input
                  id="event-time"
                  name="time"
                  type="time"
                  value={this.state.time}
                  onChange={this.handleTimeChange}
                  placeholder="Date of the event"
                />
                <span
                  className="right-now-btn event-btn"
                  onClick={this.handleRightNowClick}
                >
                  Right Now!
                </span>
              </div>
              <div className="CreateEventView_inputs">
                <label htmlFor="event-title">Title</label>
                <input
                  id="event-title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleInputChange}
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
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="CreateEventView_inputs">
                <label htmlFor="event-duration">Duration (minutes)</label>
                <input
                  id="event-duration"
                  name="duration"
                  type="number"
                  placeholder="Duration of the event"
                  value={this.state.duration}
                  onChange={this.handleInputChange}
                  min="5"
                />
              </div>

              <h3>Location</h3>
              <p>
                Lat: {this.state.location.lat} Lng: {this.state.location.lng}
              </p>
              <span
                className="select-location-btn event-btn"
                onClick={this.handleMapToggle}
              >
                Select Location
              </span>

              <h3>Genres</h3>

              <GenreCheckbox
                options={this.props.definedGenres}
                selected={this.state.genre}
                onSelectedChange={this.handleGenreSelectionChange}
              />

              <button className="create-event-button event-btn">Confirm</button>
            </form>
          </div>
        )) || (
          <MapOverlay
            onClose={this.handleMapToggle}
            onConfirmation={this.handleLocationChange}
            userLocation={this.props.userLocation}
          />
        )}
      </div>
    );
  }
}

export default CreateEventView;
