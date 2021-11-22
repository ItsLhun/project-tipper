import React, { useState, useEffect } from 'react';
import SearchArtistMini from '../../components/SearchArtistMini/SearchArtistMini';
import SearchEventMini from '../../components/SearchEventMini/SearchEventMini';
import closeIcon from './close-icon.svg';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import './SearchList.scss';

import { searchArtist } from '../../services/artist';
import { searchEvent } from '../../services/event';

const queryString = require('query-string');

function SearchListView(props) {
  const [artistsSearchList, setArtistsSearchList] = useState([]);
  const [artistSearchCount, setArtistSearchCount] = useState(0);
  const [eventsSearchList, setEventsSearchList] = useState([]);
  const [eventsSearchCount, setEventsSearchCount] = useState(0);

  const [search, setSearch] = useState('');
  // const [activeSearch, setActiveSearch] = useState('artists');
  const [activeSearch, setActiveSearch] = useState('artists');

  const [genres, setGenres] = useState([]);

  const clearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    // check if genre is array
    if (parsed.genre && Array.isArray(parsed.genre)) {
      setGenres([...genres, ...parsed.genre]);
    } else if (parsed.genre) {
      setGenres([...genres, parsed.genre]);
    }
  }, []);

  useEffect(() => {
    if (activeSearch === 'artists') {
      fetchArtists();
    } else if (activeSearch === 'events') {
      fetchEvents();
    }
  }, [search, genres, activeSearch]);

  const fetchArtists = async () => {
    try {
      const artists = await searchArtist({
        q: search,
        genres: genres,
        limit: 100,
        mode: 'query'
      });
      setArtistsSearchList(artists.artists);
      setArtistSearchCount(artists.artists.length);
      const eventCount = await searchEvent({
        q: search,
        genres: genres,
        limit: 100,
        mode: 'count'
      });

      setEventsSearchCount(eventCount.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const events = await searchEvent({
        q: search,
        genres: genres,
        limit: 10,
        mode: 'query'
      });
      setEventsSearchList(events.events);
      setEventsSearchCount(events.events.length);
      const artistCount = await searchArtist({
        q: search,
        genres: genres,
        limit: 10,
        mode: 'count'
      });
      setArtistSearchCount(artistCount.count);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleActiveSearch = (e) => {
    if (activeSearch !== e.target.getAttribute('name')) {
      setActiveSearch(e.target.getAttribute('name'));
    }
  };

  return (
    <div className="SearchListView">
      <h2>Ready to explore?</h2>
      <div className="input-wrapper">
        <img
          src="https://img.icons8.com/ios/50/000000/search.png"
          alt="search"
        />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        <img
          onClick={clearSearch}
          src={closeIcon}
          alt="search"
          className={search ? '' : 'd-none'}
        />
      </div>
      <GenreCheckbox
        options={[
          {
            label: 'hip hop',
            value: 'hip-hop'
          },
          {
            label: 'rock',
            value: 'rock'
          },
          {
            label: 'pop',
            value: 'pop'
          },
          {
            label: 'country',
            value: 'country'
          },
          {
            label: 'jazz',
            value: 'jazz'
          },
          {
            label: 'classical',
            value: 'classical'
          },
          {
            label: 'blues',
            value: 'blues'
          }
        ]}
        selected={genres}
        onSelectedChange={(selected) => setGenres(selected)}
        blobSize={'small'}
      />
      <ul className="type-selection">
        <li
          onClick={toggleActiveSearch}
          name="artists"
          className={(activeSearch === 'artists' && `active`) || ''}
        >
          Artists
          <span
            onClick={toggleActiveSearch}
            name="artists"
            className={(activeSearch === 'artists' && `active`) || ''}
          >
            {artistSearchCount > 99 ? '99+' : artistSearchCount}
          </span>
        </li>
        <li
          onClick={toggleActiveSearch}
          name="events"
          className={(activeSearch === 'events' && `active`) || ''}
        >
          Events
          <span
            onClick={toggleActiveSearch}
            name="events"
            className={(activeSearch === 'events' && `active`) || ''}
          >
            {eventsSearchCount > 99 ? '99+' : eventsSearchCount}
          </span>
        </li>
      </ul>
      <div className="search-list">
        {activeSearch === 'artists' &&
          artistsSearchList.map((artist) => (
            <SearchArtistMini key={artist._id} artist={artist} />
          ))}
        {activeSearch === 'events' &&
          eventsSearchList.map((event) => (
            <SearchEventMini key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
}

export default SearchListView;
