export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.temp = { F: data.main.temp };
  result.city = data.name;
  result.type = getWeatherType(result.temp.F);
  result.condition = weatherCondition(data.weather[0].id);
  result.isDay = isDay(data.sys, Date.now() / 1000);
  return result;
};

const isDay = ({ sunrise, sunset }, timeNow) => {
  return timeNow > sunrise && timeNow < sunset;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const weatherCondition = (conditionCode) => {
  switch (true) {
    case Math.floor(conditionCode / 100) == 2:
      return "stormy";
    case Math.floor(conditionCode / 100) == 3 ||
      Math.floor(conditionCode / 100) == 5:
      return "rainy";
    case Math.floor(conditionCode / 100) == 6:
      return "snowy";
    case conditionCode === 741:
      return "foggy";
    case conditionCode === 800:
      return "clear";
    case Math.floor(conditionCode / 100) == 8:
      return "cloudy";
    default:
      return "default";
  }
};
