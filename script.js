const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const forecast = data.weather[0].description;
      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Forecast: ${forecast}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `Error: ${error.message}`;
    });
}
