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
      resolve(userCoordinates);
    }

    function error(err) {
      if (err.code === err.PERMISSION_DENIED) {
        resolve(coordinates);
      } else {
        reject(coordinates);
      }
    }

    if (!navigator.geolocation) {
      reject(coordinates);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};
