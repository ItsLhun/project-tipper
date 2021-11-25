export const geocodeLatLng = (geocoder, coordinates, callback) => {
  console.log('coordinates ', coordinates);
  geocoder
    .geocode({ location: coordinates })
    .then((response) => {
      if (response.results[0]) {
        callback(coordinates, response.results[0]);
      } else {
        console.log('No results found');
      }
    })
    .catch((e) => console.log('Geocoder failed due to: ' + e));
};
