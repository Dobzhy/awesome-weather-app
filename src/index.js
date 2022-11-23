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
todayDate.innerHTML = `${date} ${month}, ${day}, ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#current-city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function checkCel() {
  let tempCel = document.querySelector("#daily-temp");
  tempCel.innerHTML = "17";
}
let celcius = document.querySelector("#current-temp-celsius");
celcius.addEventListener("click", checkCel);

function checkFar() {
  let tempFar = document.querySelector("#daily-temp");
  tempFar.innerHTML = "43";
}
let fahrenheit = document.querySelector("#current-temp-fahrenheit");
fahrenheit.addEventListener("click", checkFar);

let city = "Kyiv";
let apiKey = "c63330d1a18dc500bd9ea8922f53467e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#daily-temp");
  let cityElement = document.querySelector("#current-city");
  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.name;
}
function searchLocation(city) {
  let apiKey = "c63330d1a18dc500bd9ea8922f53467e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchLocation(city);
}

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchLocation(city);

function searchNewCity() {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let findLocation = document.querySelector("#current-city");
findLocation.addEventListener("click", searchNewCity);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchPosition(position) {
  let apiKey = "c63330d1a18dc500bd9ea8922f53467e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
