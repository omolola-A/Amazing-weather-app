function displayTemperature (response) {
    console.log(response.data)
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity")
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = (response.data.city);
    descriptionElement.innerHTML = (response.data.condition.description);
    windElement.innerHTML =Math.round(response.data.wind.speed);
    humidityElement.innerHTML = (response.data.temperature.humidity);
}



let apiKey = "842ob006tcafb4aa4e0f07ff3d78a3df";
let apiUrl =
  `https://api.shecodes.io/weather/v1/current?query= New York&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);