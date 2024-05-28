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

    function error(err) {
      // Check if the error is due to user denying location access
      if (err.code === err.PERMISSION_DENIED) {
        resolve(coordinates); // Use default coordinates
      } else {
        reject(coordinates); // Reject the Promise with default coordinates for other errors
      }
    }

    if (!navigator.geolocation) {
      reject(coordinates); // Reject the Promise if geolocation is not supported
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};
