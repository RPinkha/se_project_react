import { coordinates } from "./constants";

//-----------------FUNCTION TO CHECK RESPONSE FROM SERVER------------------>>
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

//-----------------FUNCTION TO GET USER LOCATION------------------>>
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const userCoordinates = { latitude, longitude };
      resolve(userCoordinates); // Resolve the Promise with coordinates
    }

    function error() {
      reject(coordinates); // Reject the Promise with default coordinates
    }

    if (!navigator.geolocation) {
      reject(coordinates); // Reject the Promise if geolocation is not supported
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};
