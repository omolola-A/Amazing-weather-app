function formatDate (timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday", 
    "Monday",
     "Tuesday", 
     "Wednesday", 
     "Thursday", 
     "Friday", 
     "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timeStamp){
let date = new Date(timeStamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForcast(response) {
let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forcast");
  let forecastHTML = `<div class="row">`;
  

  forecast.forEach(function(forecastDay, index){
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
    <div class="weather-forecast-date">
      ${formatDay(forecastDay.time)}
    </div>
    <img 
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
    alt="" 
    width="36"
    />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
      ${Math.round(forecastDay.temperature.maximum)}⁰
    </span>
    <span class="weather-forecast-temperature-min">
      ${Math.round(forecastDay.temperature.minimum)}⁰
    </span>
    </div>
       </div> 

   `;
    }
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast (coordinates) {
  let apiKey = "842ob006tcafb4aa4e0f07ff3d78a3df";
  let apiUrl = 
  `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then (displayForcast);
}


function displayTemperature (response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = (response.data.city);
    descriptionElement.innerHTML = (response.data.condition.description);
    windElement.innerHTML =Math.round(response.data.wind.speed);
    humidityElement.innerHTML = (response.data.temperature.humidity);
    dateElement.innerHTML = formatDate(response.data.time*1000);
    iconElement.setAttribute(
      "src",
      `${response.data.condition.icon_url}`
    );
    iconElement.setAttribute("alt", response.data.condition.description);

    getForecast(response.data.coordinates);
}

function search(city) {
let apiKey = "842ob006tcafb4aa4e0f07ff3d78a3df";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query= ${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}
let celsiusTemperature = null

function displayFahrenheitTemperature (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 function displayCelsiusTemperature (event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
 }


  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);


   let fahrenheitlink = document.querySelector("#fahrenheit-link");
   fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

   let celsiuslink = document.querySelector("#celsius-link");
   celsiuslink.addEventListener("click", displayCelsiusTemperature);

    search("New York");