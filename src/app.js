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


function displayTemperature (response) {
    console.log(response.data)
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let dateElement = document.querySelector("#date");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = (response.data.city);
    descriptionElement.innerHTML = (response.data.condition.description);
    windElement.innerHTML =Math.round(response.data.wind.speed);
    humidityElement.innerHTML = (response.data.temperature.humidity);
    dateElement.innerHTML = formatDate(response.data.time*1000);
}



let apiKey = "842ob006tcafb4aa4e0f07ff3d78a3df";
let apiUrl =
  `https://api.shecodes.io/weather/v1/current?query= New York&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);