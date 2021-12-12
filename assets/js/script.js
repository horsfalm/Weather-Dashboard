var APIKey = "70eb41e7cb859fabeb6a0e9e73af9f36";
var inputFormEl = document.querySelector("#current-search");
var currentCityEl = document.querySelector("#city");
var recentSearchesEl = document.querySelector("#search-bottom");
var cityIdCounter = 0;
var searchArr = [];

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
    if (searchArr.includes(currentCityEl.value)) {
        return alert("City is already displayed. Please choose another city.");
    } else {
        if (city) {
        searchArr.push(currentCityEl.value);
            if (searchArr.length > 10) {
                searchArr.shift();
            }
        $('#search-bottom').empty();
        for (i=0; i < searchArr.length; i++) {
            var recentCity = document.createElement('BUTTON');
            $(recentCity).addClass("weather-button").val(searchArr[i]).append(searchArr[i]);
            $('#search-bottom').append(recentCity);  
        }

        getCity(city);
        currentCityEl.value = "";
        console.log(searchArr);
    } else {
        alert("Please enter a city name");
        };
    };
};

var recentSearchHandler = function(event) {
    event.preventDefault();
    city = event.target.value;
    getCity(city);
    console.log(searchArr);
}
    
 //   $('#search-bottom').empty();
 //       for (i=0; i < searchArr.length; i++) {
 //           var recentCity = document.createElement('BUTTON');
 //           $(recentCity).addClass("weather-button").append(searchArr[i]);
 //           $('#search-bottom').append(recentCity);  
 //           }
    
 //           getCity(city);
 //       };
        

var displayCurrent = function(city) {
    
    clearCurrent(); //remove prior search from display
    
    // city + current date
    var day0 = document.createElement("p");
    $(day0).addClass("conditions");
    day0.id = "day-0";
    var day0Val = ("(" + new Date((city.dt)*1000).toLocaleString([], {day: '2-digit', month: '2-digit', year: '2-digit'}) + ")");
    $(day0).append(city.name + " ").append(day0Val);
    $( "#operative" ).prepend(day0);
    
    // current weather icon
    var day0Icon = city.weather[0].icon;
    document.getElementById('icon-day0').src="http://openweathermap.org/img/w/"+day0Icon+".png";


    // current day temp
    var day0Temp = document.createElement("p");
    $(day0Temp).addClass("conditions");
    day0Temp.id = "day-0-temp";
    var day0TempVal = (((city.main.temp)-273.15) * 9 / 5 + 32).toFixed(2);
    $(day0Temp).append(" " + day0TempVal + " " + String.fromCharCode(176) + "F");
    $( "#temp" ).append(day0Temp);
    
    // current day wind
    var day0Wind = document.createElement("p");
    $(day0Wind).addClass("conditions");
    day0Wind.id = "day-0-wind";
    var day0WindVal = (city.wind.speed).toFixed(2);
    $(day0Wind).append(" " + day0WindVal + " MPH");
    $( "#wind" ).append(day0Wind); 
    
    // current day humidity
    var day0Humidity = document.createElement("p");
    $(day0Humidity).addClass("conditions");
    day0Humidity.id = "day-0-humidity";
    var day0HumidityVal = city.main.humidity;
    $(day0Humidity).append(" " + day0HumidityVal + " %");
    $( "#humidity" ).append(day0Humidity);
}

var displayForecast = function(city) {
    clearForecast(); //remove prior search from display

    const forecastDays = [
        {day: city.list[7].dt, icon: city.list[7].weather[0].icon, temp: city.list[7].main.temp, wind: city.list[7].wind.speed},
        {day: city.list[15].dt, icon: city.list[15].weather[0].icon, temp: city.list[15].main.temp, wind: city.list[15].wind.speed},
        {day: city.list[23].dt, icon: city.list[23].weather[0].icon, temp: city.list[23].main.temp, wind: city.list[23].wind.speed},
        {day: city.list[31].dt, icon: city.list[31].weather[0].icon, temp: city.list[31].main.temp, wind: city.list[31].wind.speed},
        {day: city.list[39].dt, icon: city.list[39].weather[0].icon, temp: city.list[39].main.temp, wind: city.list[39].wind.speed}
    ]
        for (i = 0; i < forecastDays.length; i++) {
            var forecastDay = new Date(forecastDays[i].day*1000).toLocaleString([], {day: '2-digit', month: '2-digit', year: '2-digit'});
            forecastDay.class = "forecast";

            var forecastIcon = $('<img>').attr('src',"http://openweathermap.org/img/w/"+forecastDays[i].icon+".png");
            forecastIcon.class = "forecast";

            var forecastTemp = "<br>" + "Temp: " + (((forecastDays[i].temp)-273.15) * 9 / 5 + 32).toFixed(2) + String.fromCharCode(176) + "F";
            forecastTemp.class = "forecast";

            var forecastWind = "<br><br>" + "Wind: " + (forecastDays[i].wind).toFixed(2) + " MPH";
            forecastWind.class = "forecast";

            var forecastHumidity = "<br><br>" + "Humidity: ";
            forecastHumidity.class = "forecast";
            
            jQuery("<div>",{
                class: "day",
                id: "day" + [i],
            }).appendTo("#forecast-cards");
            $('#day' + [i]).append(forecastDay, '<br>', forecastIcon,forecastTemp, forecastWind, forecastHumidity);
        }        
    }

var clearCurrent = function() {
    $( "#operative" ).empty();
    $( "#temp" ).empty();
    $( "#wind" ).empty();
    $( "#humidity" ).empty();
};

var clearForecast = function() {
    $( "#forecast-cards" ).empty();
};

recentSearchesEl.addEventListener("click", recentSearchHandler);
inputFormEl.addEventListener("submit", formSubmitHandler);

//UV Index = 
//localStorage.setItem(city);