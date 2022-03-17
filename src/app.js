let now = new Date();
let dateToday = document.querySelector("#date-today");
let timeNow = document.querySelector("#current-time");

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
let date = now.getDate();
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
let year = now.getFullYear();
let hours = now.getHours();
if (hours === 0) {
  hours = `00`;
} else {
  if (hours < 10) {
    hours = `0${hours}`;
  }
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateToday.innerHTML = `${day} ${date} ${month} ${year}`;
timeNow.innerHTML = `${hours}:${minutes}`;

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// need to add in a greeting function

// AS BELOW changing celcius to fahrenheit just loses all my data re: searched location. and it doesn't work anyway...

// function showFahrenheit(event) {
//     event.preventDefault();
//     let tempF = document.querySelector("#temperature-now");
//     let temperature = `${Math.round(tempC * 9) / 5 + 32}`;
//     tempF.innerHTML = temperature;
//     }

//   let tempF = document.querySelector("#temperature-f");
//   tempF.addEventListener("click", showFahrenheit);

//   function showCelcius(event) {
//     event.preventDefault();
//     let tempC = document.querySelector("#temperature-now");
//     tempC.innerHTML = Math.round(response.data.main.temp;
//   }

//   let tempC = document.querySelector("#temperature-c");
//   tempC.addEventListener("click", showCelcius);

//future forecast

function displayFutureForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#future-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="the-future-day">${day}</div>
            <img
              src=""
              alt="Weather Icon"
              class="future-weather-icon"
              width="36"
            />
            <div class="the-future-temps">
              <span class="future-temp-min">4°C</span>
              <span class="future-temp-max">8°C</span>
            </div>
          </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//end of future forecast

function getFutureForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1cea906f8f3ab268b1c4225a33a9637a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFutureForecast);
}

function displayWeatherCondition(response) {
  //remove this console.log
  console.log(response.data);
  let citySearchedElement = document.querySelector("#searched-location");
  let temperatureElement = document.querySelector("#temperature-now");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let weatherIconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  citySearchedElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity + "%";
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  descriptionElement.innerHTML = response.data.weather[0].description;
  minTempElement.innerHTML = Math.round(response.data.main.temp_min) + "°C";
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max) + "°C";
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);

  getFutureForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1cea906f8f3ab268b1c4225a33a9637a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "1cea906f8f3ab268b1c4225a33a9637a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  celsiusOption.classList.remove("active");
  farhenheitOption.classList.add("active");
  let farhenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farhenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusOption.classList.add("active");
  farhenheitOption.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let farhenheitOption = document.querySelector("#temperature-f");
farhenheitOption.addEventListener("click", displayFahrenheit);

let celsiusOption = document.querySelector("#temperature-c");
celsiusOption.addEventListener("click", displayCelsius);

searchCity("Glasgow");
