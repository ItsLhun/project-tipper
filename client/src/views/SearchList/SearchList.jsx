import MapSearch from '../../components/MapSearch/MapSearch';
import './Search.scss';

function SearchListView() {
  //   const handleSearchClick = (e) => {
  //     e.preventDefault();
  //     console.log('Search clicked');
  //   };

  return (
    <div className="SearchListView">
      <MapSearch />
      <p>Hello world</p>
    </div>
  );
}

export default SearchListView;
