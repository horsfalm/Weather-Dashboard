var APIKey = "70eb41e7cb859fabeb6a0e9e73af9f36";
var inputFormEl = document.querySelector("#current-search");
var currentCityEl = document.querySelector("#city");

var getCity = function(city) {
    var queryCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var queryForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    
    fetch(queryCurrent).then(function(queryCurrent) {
        queryCurrent.json().then(function(queryCurrent) {
            displayCurrent(queryCurrent, city);
        });
    });

    fetch(queryForecast).then(function(queryForecast) {
        queryForecast.json().then(function(queryForecast) {
            displayForecast(queryForecast, city);
        });
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = currentCityEl.value.trim();

    if (city) {
        getCity(city);
        currentCityEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

var displayCurrent = function(city) {   
    var day0 = ("(" + new Date((city.dt)*1000).toLocaleString([], {day: '2-digit', month: '2-digit', year: '2-digit'}) + ")");
    var day0Temp = (((city.main.temp)-273.15) * 9 / 5 + 32).toFixed(2);
    var day0Wind = (city.wind.speed).toFixed(2);
    var day0Humidity = (city.main.humidity);
    $( "#operative" ).append(city.name + " ").append(day0);
    $( "#temp" ).append(" " + day0Temp + String.fromCharCode(176) + "F");
    $( "#wind" ).append(" " + day0Wind + " MPH");
    $( "#humidity" ).append(" " + day0Humidity + " %");
}

var displayForecast = function(city) {
    const forecastDays = [
        {day: city.list[7].dt, temp: city.list[7].main.temp, wind: city.list[7].wind.speed},
        {day: city.list[15].dt, temp: city.list[15].main.temp, wind: city.list[15].wind.speed},
        {day: city.list[23].dt, temp: city.list[23].main.temp, wind: city.list[23].wind.speed},
        {day: city.list[31].dt, temp: city.list[31].main.temp, wind: city.list[31].wind.speed},
        {day: city.list[39].dt, temp: city.list[39].main.temp, wind: city.list[39].wind.speed}
    ]
        for (i = 0; i < forecastDays.length; i++) {
            var forecastDay = new Date(forecastDays[i].day*1000).toLocaleString([], {day: '2-digit', month: '2-digit', year: '2-digit'});
            var forecastTemp = "<br><br><br>" + "Temp: " + (((forecastDays[i].temp)-273.15) * 9 / 5 + 32).toFixed(2) + String.fromCharCode(176) + "F";
            var forecastWind = "<br><br>" + "Wind: " + (forecastDays[i].wind).toFixed(2) + " MPH";
            var forecastHumidity = "<br><br>" + "Humidity: ";
            

            jQuery("<div>",{
                class: "day",
                id: "day" + [i],
            }).appendTo("#forecast-cards");
            $('#day' + [i]).append(forecastDay, forecastTemp, forecastWind, forecastHumidity);
        }        
}

inputFormEl.addEventListener("submit", formSubmitHandler);

//Icon = "weather" / "main"
//UV Index = 