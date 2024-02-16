function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // Convert degrees to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return distance;
}

// Function to generate coordinates between two points with a specified distance
function generateCoordinates(start, end, distance) {
  const coordinates = [];
  const totalDistance = calculateDistance(start[0], start[1], end[0], end[1]);
  const numSegments = Math.floor(totalDistance / distance);
  const fraction = 1 / numSegments;

  for (let i = 0; i <= numSegments; i++) {
    const ratio = i * fraction;
    const newPoint = {
      lat: start.lat + (end.lat - start.lat) * ratio,
      lon: start.lon + (end.lon - start.lon) * ratio,
    };
    coordinates.push(newPoint);
  }

  return coordinates;
}

module.exports = { genPathPoints: generateCoordinates };
