//src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function getData() {
  let city = document.getElementById("city").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb9ecf774df2e9f5164f0d97fb5b5d84`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      append(res);
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getDataLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cb9ecf774df2e9f5164f0d97fb5b5d84`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      append(res);
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function append(data) {
  let container = document.getElementById("box");
  let map = document.getElementById("gmap_canvas");
  container.innerHTML = null;

  let city = document.createElement("p");
  city.innerText = `City: ${data.name}`;

  let min = document.createElement("p");
  min.innerText = `Min temp: ${data.main.temp_min}`;

  let max = document.createElement("p");
  max.innerText = `Max temp: ${data.main.temp_max}`;

  let current = document.createElement("p");
  current.innerText = `Current Temp: ${data.main.temp}`;

  let humidity = document.createElement("p");
  humidity.innerText = `Humidity: ${data.main.humidity}`;

  let wind = document.createElement("p");
  wind.innerText = `Wind speed: ${data.wind.speed}`;

  let sunrise = document.createElement("p");
  sunrise.innerText = `Sunrise: ${data.sys.sunrise}`;

  let sunset = document.createElement("p");
  sunset.innerText = `Sunset: ${data.sys.sunset}`;

  container.append(city, min, max, current, humidity, wind, sunrise, sunset);

  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  map.style.marginLeft = "550px";
  map.style.marginTop = "-420px";
  // map.style.margin = "auto";
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {
    let crd = position.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getDataLocation(crd.latitude, crd.longitude);

    forecast(crd.latitude, crd.longitude);
  }
}

// data for 7 days
const weatherForecastEl = document.getElementById("weather_forecast");
const currentTempEl = document.getElementById("current_temp");

function forecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,current&units=metric&appid=cb9ecf774df2e9f5164f0d97fb5b5d84`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      showForecastData(data);
    });
}

function showForecastData(data) {
  let otherDayForecast = "";
  data.daily.forEach((day, index) => {
    if (index === 0) {
      currentTempEl.innerHTML = ` 
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w_icon">
            <div class="other">
                <div class="day"> Today</div>
                <div class="temp"> ${day.temp.max}&#176; C</div>
                <div class="temp"> ${day.temp.min}&#176; C</div>
            </div>`;
    } else {
      otherDayForecast += `
            <div class="weather_forecast_item">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w_icon">
                <div class="temp"> ${day.temp.max}&#176; C</div>
                <div class="temp"> ${day.temp.min}&#176; C</div>
            </div>`;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}
