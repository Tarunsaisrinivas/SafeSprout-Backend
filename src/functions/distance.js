function distange(location1, location2) {
  const earthRadius = 6371000; // Radius of the Earth in meters
  const { lon: lon1, lat: lat1 } = location1;
  const { lon: lon2, lat: lat2 } = location2;

  // Convert latitude and longitude from degrees to radians
  const lon1Rad = toRadians(lon1);
  const lat1Rad = toRadians(lat1);
  const lon2Rad = toRadians(lon2);
  const lat2Rad = toRadians(lat2);

  // Haversine formula
  const dLon = lon2Rad - lon1Rad;
  const dLat = lat2Rad - lat1Rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = distange;
