var APIKey = "70eb41e7cb859fabeb6a0e9e73af9f36";
var city = "Minnesota";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL).then(function(queryURL) {
    queryURL.json().then(function(queryURL) {
        console.log(queryURL);
    });
});