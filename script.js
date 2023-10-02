"use strict";

// Your API key for OpenWeatherMap
//const apikey = ""; Insert your API key

// Initialize variables
let city;
let weatherIcon = document.querySelector(".weather-icon");
const searchBtn = document.querySelector(".search button");

// Function to check if the entered city is valid
function checkCity(city) {
  if (typeof city === "string" && city.length != 0) {
    return true;
  } else {
    // Display a warning message if the city is not valid
    document.querySelector(".warning").textContent =
      "Please Enter a valid city";
    document.querySelector(".place").value = "";
    document.querySelector(".weather").style.display = "none";

    return false;
  }
}

// Function to fetch and display weather data
async function checkWeather(city) {
  // Construct the API URL for OpenWeatherMap
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;

  // Fetch weather data from the API
  const response = await fetch(apiurl);
  let data = await response.json();
  console.log(data);

  if (data.cod == "404") {
    // Display a message if the city is not found
    document.querySelector(".warning").textContent = "City not Found";
    document.querySelector(".place").value = "";
    document.querySelector(".weather").style.display = "none";
    console.log("City not found");
    return;
  } else {
    // Display weather information if the city is found
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".warning").textContent = "";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    // Set the weather icon based on weather conditions
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  city = document.querySelector(".place").value;
  city = city.trim().toLowerCase();

  if (checkCity(city)) {
    checkWeather(city);
  }
});
