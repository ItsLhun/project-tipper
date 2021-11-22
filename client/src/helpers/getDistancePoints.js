function degToRag(deg) {
  return deg * (Math.PI / 180);
}

export function getDistancePoints(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = degToRag(lat2 - lat1); // deg2rad below
  var dLon = degToRag(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRag(lat1)) *
      Math.cos(degToRag(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
