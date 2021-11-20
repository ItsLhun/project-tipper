import React, { useState, useEffect } from 'react';
import SearchArtistMini from '../../components/SearchArtistMini/SearchArtistMini';
import closeIcon from './close-icon.svg';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import './SearchList.scss';

import { searchArtist } from '../../services/artist';

const queryString = require('query-string');

function SearchListView(props) {
  const [artistsSearchList, setArtistsSearchList] = useState([]);
  const [artistSearchCount, setArtistSearchCount] = useState(0);
  const [search, setSearch] = useState('');
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
      searchArtist({ q: search, genres: genres, limit: 10 })
        .then((res) => {
          setArtistsSearchList(res);
          setArtistSearchCount(res.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (activeSearch === 'events') {
      // searchEvents({ q: search, genres: genres, limit: 10 })
      //   .then((res) => {
      //     setEventsSearchList(res);
      //     setEventsSearchCount(res.length);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [search, genres]);

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
        <li className={(activeSearch === 'artists' && `active`) || ''}>
          Artists
          <span className={(activeSearch === 'artists' && `active`) || ''}>
            {artistSearchCount > 99 ? '99+' : artistSearchCount}
          </span>
        </li>
        <li className={(activeSearch === 'events' && `active`) || ''}>
          Events
          <span className={(activeSearch === 'events' && `active`) || ''}>
            999
          </span>
        </li>
      </ul>
      <div className="search-list">
        {artistsSearchList.map((artist) => (
          <SearchArtistMini key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default SearchListView;
