import React, { useState, useEffect } from 'react';
import SearchArtistMini from '../../components/SearchArtistMini/SearchArtistMini';
import closeIcon from './close-icon.svg';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import './SearchList.scss';

const queryString = require('query-string');

function SearchListView(props) {
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('artists');
  const [genres, setGenres] = useState([]);

  const clearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
    // check if genre is array
    if (parsed.genre && Array.isArray(parsed.genre)) {
      setGenres([...genres, ...parsed.genre]);
    } else if (parsed.genre) {
      setGenres([...genres, parsed.genre]);
    }
  }, []);
  console.log(genres);

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
            999
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
        <SearchArtistMini />
        <SearchArtistMini />
        <SearchArtistMini />
        <SearchArtistMini />
        <SearchArtistMini />
        <SearchArtistMini />
        <SearchArtistMini />
      </div>
    </div>
  );
}

export default SearchListView;
