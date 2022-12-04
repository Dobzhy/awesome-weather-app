let now = new Date();
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let todayDate = document.querySelector("#current-date");
todayDate.innerHTML = `${date} ${month}, ${day} ${hour}:${minute}`;

function searchCity(city) {
  let apiKey = "c63330d1a18dc500bd9ea8922f53467e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#daily-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(position) {
  let apiKey = "c63330d1a18dc500bd9ea8922f53467e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertCelcius(event) {
  event.preventDefault();
  let tempElementCelcius = document.querySelector("#current-temp");
  tempElementCelcius.innerHTML = "18";
}

function convertFahrenheit(event) {
  event.preventDefault();
  let tempElementFahrenheit = document.querySelector("#current-temp");
  tempElementFahrenheit.innerHTML = Math.round((18 * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#current-temp-far");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celciusLink = document.querySelector("#current-temp-cel");
celciusLink.addEventListener("click", convertCelcius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

function changeScr() {
  document.getElementById("weather-icon-main").src = "img/cloud.png";
}
