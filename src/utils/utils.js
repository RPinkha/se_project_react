//-----------------FUNCTION TO CHECK RESPONSE FROM SERVER------------------>>
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

//-----------------FUNCTION TO GET USER LOCATION------------------>>
if ("geolocation" in navigator) {
  console.log("geolocation is available");
} else {
  console.log("geolocation is NOT available");
}
