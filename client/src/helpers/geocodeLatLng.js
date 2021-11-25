export const geocodeLatLng = (geocoder, coordinates, callback) => {
  geocoder
    .geocode({ location: coordinates })
    .then((response) => {
      if (response.results[0]) {
        callback(coordinates, response.results[0].formatted_address);
        console.log(response.results[0]);
      } else {
        console.log('No results found');
      }
    })
    .catch((e) => console.log('Geocoder failed due to: ' + e));
};
