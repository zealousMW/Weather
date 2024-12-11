const apikey = "325b524d4bc418f6f62ae0c4e35b06b6";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
var city = "chennai";
var datacopy = "";
async function getweather(position) {
    if(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const response = await fetch(apiurl+`&appid=${apikey}`+`&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        console.log(data);
        datacopy = data;

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.win').innerHTML = data.wind.speed + "km/h";
        checkWeather(data.weather[0].main);
    }
    else{
        const response = await fetch(apiurl+`&appid=${apikey}`+`&q=${city}`);
        const data = await response.json();
        console.log(data);
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.win').innerHTML = data.wind.speed + "km/h";
        checkWeather(data.weather[0].main);
    }
    
    
    
}

function checkWeather(weatherMain) {
    const weatherIcon = document.querySelector('.weather-icon'); // Select the lottie-player element
    const message = document.querySelector('.message');
    if (weatherMain === "Clear") {
        weatherIcon.load("src/clear.json");
        message.innerHTML = "The weather is clear. Enjoy the sunshine!"
    } else if (weatherMain === "Clouds") {
         weatherIcon.load("src/clouds.json");
      message.innerHTML = "It's cloudy outside. You might not need sunglasses.";
    } else if (weatherMain === "Rain") {
        weatherIcon.load("src/rain.json");
        message.innerHTML = "It's raining. Don't forget your umbrella!";
    } else if (weatherMain === "Snow") {
        weatherIcon.load("src/snow.json");
       message.innerHTML = "Snowfall alert! Wear warm clothes.";
    } else if (weatherMain === "Thunderstorm") {
        weatherIcon.load("src/thunder.json");
         message.innerHTML ="Thunderstorm warning! Stay safe indoors.";
    } else {
        weatherIcon.load("src/unpredict.json");
        message.innerHTML = "The weather is unpredictable. Check again later!";
    }
}


function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getweather);
    }
    else{
        getweather(null);
    }
}

getlocation();