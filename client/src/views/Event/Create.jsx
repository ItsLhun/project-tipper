import { Component } from 'react';
import { createEvent } from '../../services/event';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';

class EventCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Event Name',
      location: [{ city: 'City', state: 'State', country: 'Country' }],
      description: 'Event Description',
      genres: []
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { title, location, description, genres } = this.state;
    createEvent({ title, location, description, genres })
      .then((course) => {
        console.log('okay');
        // this.props.history.push('/course/list');
      })
      .catch((error) => {
        alert('There was an error creating event.');
        console.log(error);
      });
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

          <GenreCheckbox
            options={[
              { value: 'dog', label: 'Dog' },
              { value: 'cat', label: 'Cat' },
              { value: 'bird', label: 'Bird' },
              { value: 'hamster', label: 'Hamster' }
            ]}
            selected={this.state.pets}
            onSelectedChange={this.handlePetSelectionChange}
          />
          <input
            type="checkbox"
            name="genre-african"
            id="genre-african"
            value="African"
          />
          <label htmlFor="genre-african">African</label>
          <input
            type="checkbox"
            name="genre-arabic"
            id="genre-arabic"
            value="Arabic"
          />
          <label htmlFor="genre-arabic">Arabic</label>

          <input type="checkbox" name="genre-axe" id="genre-axe" value="Axé" />
          <label htmlFor="genre-axe">Axé</label>
          <input
            type="checkbox"
            name="genre-blues"
            id="genre-blues"
            value="Blues"
          />
          <label htmlFor="genre-blues">Blues</label>
          <input
            type="checkbox"
            name="genre-bollywood-indian"
            id="genre-bollywood-indian"
            value="Bollywood & Indian"
          />
          <label htmlFor="genre-bollywood-indian">Bollywood * Indian</label>
          <input
            type="checkbox"
            name="genre-classical"
            id="genre-classical"
            value="Classical"
          />
          <label htmlFor="genre-classical">Classical</label>

          <input
            type="checkbox"
            name="genre-rock"
            id="genre-rock"
            value="Rock"
          />
          <label htmlFor="genre-rock">Rock</label>

          <button>Create Event</button>
        </form>
      </div>
    );
  }
}

export default EventCreate;
