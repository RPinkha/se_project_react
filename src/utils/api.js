import { baseUrl, checkResponse } from "./constants";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem(name, weather, imageUrl) {
  return fetch(`${baseUrl}/users/me`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
    }),
  }).then(checkResponse);
}

export { getItems, addItem };
