const weatherKey = '07c5500a2d1583111e65d0446309ef8c';
const input = document.getElementById('input')
const city = document.getElementById('city');
const icon = document.getElementById('img');
const description = document.getElementById('description');
//const clouds = document.getElementById('clouds') Dodać czy nie?
const temp = document.getElementById('temp');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const sunset = '?';
const sunrise = '?';
const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');
const currentDate = document.getElementById('current-date');
const dayOfTheYear = document.getElementById('day-of-the-year');


const weatherMethods = {
    getWeather() { 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=zabrze&units=metric&appid=${weatherKey}&lang=pl`).then(resp => {
            return resp.json().then(resp => {
                this.renderFetchedData(resp)
                this.changeBackground(resp)
                console.log(resp)
            })
        })
    },

    renderFetchedData(data) {
        city.textContent = data.name;
        icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        description.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        temp.textContent = Math.round(data.main.temp);
        tempMax.textContent = Math.round(data.main.temp_max);
        tempMin.textContent = Math.round(data.main.temp_min);
        humidity.textContent = data.main.humidity + ' %';
        pressure.textContent = data.main.pressure + ' hPa';
        sunset.textContent = data.sys.sunset;
        sunrise.textContent = data.sys.sunrise;
        windSpeed.textContent = data.wind.speed + ' km/h';
        windDirection.textContent = data.wind.deg;
        currentDate.textContent = moment().format('dddd, D MMMM YYYY, h:mm');
        dayOfTheYear.textContent = moment().format('DDD') + ' dzień roku'
    },

    changeBackground(data) {
        switch (data.weather[0].main) {
            case 'Thunderstorm':
                document.body.style.backgroundImage = "url('img/thunderstorm.jpg)";
                break;
            case 'Clouds':
                document.body.style.backgroundImage = "url(img/clouds.jpg)";
                break;
            case 'Clear':
                document.body.style.backgroundImage = "url(img/sun2.jpg)";
                break;
            case 'Snow':
                document.body.style.backgroundImage = "url(img/snow.jpg)";
                break;
            case 'Rain':
                document.body.style.backgroundImage = "url(img/rain.jpg)";
                break;
            case 'Drizzle':
                document.body.style.backgroundImage = "url(img/rain.jpg)";
                break;
            case 'Mist':
                document.body.style.backgroundImage = "url(img/fog.jpg)";
                break;
            case 'Fog':
                document.body.style.backgroundImage = "url(img/fog.jpg)";
                break;
            case 'Haze':
                document.body.style.backgroundImage = "url(img/fog.jpg)";
                break;
        }
    }
}

moment.locale("pl"); 
weatherMethods.getWeather()


