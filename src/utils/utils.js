import { coordinates } from "./constants";

//-----------------FUNCTION TO CHECK RESPONSE FROM SERVER------------------>>
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

//-----------------FUNCTION TO GET USER LOCATION------------------>>
export const getCurrentPosition = () => {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userCoordinates = { latitude, longitude };

    return userCoordinates;
  }

  function error() {
    return coordinates;
  }

  if (!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(error);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
