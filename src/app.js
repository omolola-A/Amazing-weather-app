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

function displayForcast() {
  let forecastElement = document.querySelector("#forcast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function(day){
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
    <div class="weather-forecast-date">
      Thur
    </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    alt="" width="36"
    />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
      18⁰
    </span>
    <span class="weather-forecast-temperature-min">
      12⁰
    </span>
    </div>
       </div> 

    </div>
   </div>
   `;
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
    displayForcast();