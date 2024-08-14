import { defaultCoordinates } from "./constants";

//-----------------FUNCTION TO CHECK RESPONSE FROM SERVER------------------>>
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

//-----------------FUNCTION FERCH A REQUEST TO THE SERVER------------------>>
export function request(url, options) {
  return fetch(url, options).then(checkResponse);
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
        resolve(defaultCoordinates);
      } else {
        reject(defaultCoordinates);
      }
    }

    if (!navigator.geolocation) {
      reject(defaultCoordinates);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};
