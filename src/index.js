// JS TAB1
let now = new Date();

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

let tab1 = document.querySelector("#tab-1");
tab1.innerHTML = `${day}, ${date} ${month}`;

// JS TAB2
let tomorrow = new Date();
tomorrow.setDate(now.getDate() + 1);
let dayTomorrow = days[tomorrow.getDay()];
let dateTomorrow = tomorrow.getDate();
let monthTomorrow = months[tomorrow.getMonth()];

let tab2 = document.querySelector("#tab-2");
tab2.innerHTML = `${dayTomorrow}, ${dateTomorrow} ${monthTomorrow}`;

// Search form
function handleSubmit(event) {
    event.preventDefault();
    let formSearchCityInput = document.querySelector("#city-input");
    let h1 = document.querySelector("h1");
    h1.innerHTML = formSearchCityInput.value;
    let apiKey = "8c362dd932bee69aa7eece7fea98811a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formSearchCityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCityTemperature);
    console.log(formSearchCityInput.value);
}

let formCity = document.querySelector("#search-city-here");
formCity.addEventListener("submit", handleSubmit);

// Celsius to Fahreinht
let temperate_metric = "c";

function handleSwitchTemperature(event) {
    let temperatureSwitch = document.querySelector("#switch-temperature");

    if (temperate_metric === "c") {
        temperate_metric = "f";
        let mainTemperature = document.querySelector("#main-temperature");
        mainTemperature.innerHTML = "62.6 F";
    } else {
        temperate_metric = "c";
        let mainTemperature = document.querySelector("#main-temperature");
        mainTemperature.innerHTML = "17 ºC";
    }
}

let temperatureSwitch = document.querySelector("#switch-temperature");
temperatureSwitch.addEventListener("click", handleSwitchTemperature);

// Temperature UserCity

function showCityTemperature(response) {
    console.log(response.data);
    console.log(response.data.main.temp);
    let temperature = Math.round(response.data.main.temp);
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temperature} ºC`;
    let h1 = document.querySelector("h1");

    let location = response.data.name;
    h1.innerHTML = `${location}`;
    console.log(response.data.name);
}

// Current User Location
function handleTempUserLocation(position) {
    let apiKey = "8c362dd932bee69aa7eece7fea98811a";
    console.log(position);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCityTemperature);
}

function showTempUserLocation() {
    navigator.geolocation.getCurrentPosition(handleTempUserLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showTempUserLocation);
