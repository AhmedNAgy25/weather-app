const APIKey = "c3b815bbe766bdab376efe6262950a8c";

const container = document.querySelector(".container");
const search_btn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

// invalid city name case
function showInvalidCity() {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
}

// clear error message
function clearErrorMsg() {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");
}

// get weather case and change image
function setWeatherCase(WeatherCase) {
  switch (WeatherCase) {
    case "Clear":
      image.src = "images/clear.png";
      break;
    case "Rain":
      image.src = "images/rain.png";
      break;
    case "Snow":
      image.src = "images/snow.png";
      break;
    case "Clouds":
      image.src = "images/cloud.png";
      break;
    case "Haze":
      image.src = "images/haze.png";
      break;
    default:
      image.src = "";
  }
}

// show details
function showWeatherDetails(json) {
  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  humidity.innerHTML = `${json.main.humidity}%`;
  description.innerHTML = `${json.weather[0].description}`;
  wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
}

// expand container to show weather
function expandContainer() {
  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = "590px";
}

search_btn.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  const fentchLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  if (!city) return;

  fetch(fentchLink)
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        showInvalidCity();
        return;
      }
      clearErrorMsg();
      setWeatherCase(json.weather[0].main);
      showWeatherDetails(json);
      expandContainer();
    });
});
