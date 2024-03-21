const getWeather = ({ latitude, longitude }, apiKey) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  );
};
