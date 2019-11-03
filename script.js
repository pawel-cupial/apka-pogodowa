const weatherKey = '07c5500a2d1583111e65d0446309ef8c';
const city = document.getElementById('city');
const icon = document.getElementById('img');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');
const windSpeed = document.getElementById('wind-speed');
const currentDate = document.getElementById('current-date');
const dayOfTheYear = document.getElementById('day-of-the-year');
const searchField = document.getElementById('input')
const searchButton = document.getElementById('search-button')
const arrowIcon = document.getElementById('arrow')
const country = document.getElementById('location-info-container__country')
const coords = document.getElementById('location-info-container__coords')
const metricBtn = document.getElementById('temp-choice1')
const imperialBtn = document.getElementById('temp-choice2')

const nameSpace = {
    inputText: '',
    searchText: 'zabrze',
    windDirection: '',
    units: 'metric',
    tempUnits: '\u2103',
    speedUnits: ' m/s'
    }


const getCity = () => {
    searchField.addEventListener('input', (e) => {
        nameSpace.inputText = e.target.value
    })
    
    searchButton.addEventListener('click', () => {
        nameSpace.searchText = nameSpace.inputText
        getWeather(nameSpace.searchText, nameSpace.units)
        searchField.value = ''
    })
}

const renderFetchedData = (data) => {
    city.textContent = data.name;
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    description.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    temp.textContent = Math.round(data.main.temp) + `${nameSpace.tempUnits}`;
    tempMax.innerHTML =  Math.round(data.main.temp_max) + `${nameSpace.tempUnits}`;
    tempMin.innerHTML = Math.round(data.main.temp_min) + `${nameSpace.tempUnits}`;
    humidity.textContent = data.main.humidity + ' %';
    pressure.textContent = data.main.pressure + ' hPa'; 
    windSpeed.textContent = data.wind.speed + `${nameSpace.speedUnits}`;
    currentDate.textContent = moment().format('dddd, D MMMM YYYY, h:mm');
    dayOfTheYear.textContent = moment().format('DDD') + ' dzień roku'
    let sunsetHours = new Date(data.sys.sunset*1000).getHours();
    sunsetHours = ("0" + sunsetHours).slice(-2);
    let sunsetMinutes = new Date(data.sys.sunset*1000).getMinutes();
    sunsetMinutes = ("0" + sunsetMinutes).slice(-2);
    sunset.textContent = sunsetHours + ':' + sunsetMinutes;
    let sunriseHours = new Date(data.sys.sunrise*1000).getHours();
    sunriseHours = ("0" + sunriseHours).slice(-2);
    let sunriseMinutes = new Date(data.sys.sunrise*1000).getMinutes();
    sunriseMinutes = ("0" + sunriseMinutes).slice(-2);
    sunrise.textContent = sunriseHours + ':' + sunriseMinutes;
    nameSpace.windDirection = data.wind.deg;
    country.textContent = data.sys.country;
    coords.innerHTML = data.coord.lat + '&deg;' + ', ' + data.coord.lon + '&deg;';
}

const changeBackground = (data) => {
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

const getWeather = (city='zabrze', units='metric') => {
    getCity()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherKey}&lang=pl`).then(resp => {
        return resp.json().then(resp => {
            renderFetchedData(resp)
            changeBackground(resp)
        }).catch(error => {
            throw(alert(error))
        })
    })
}


searchField.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        searchButton.click()
        getWeather(nameSpace.searchText, nameSpace.units)
    }
})

imperialBtn.addEventListener('change', (e) =>{
    if(e.target.checked) {
        nameSpace.units = 'imperial'
        nameSpace.tempUnits = '\u2109'
        nameSpace.speedUnits = ' mph'
        getWeather(nameSpace.searchText, nameSpace.units)
    }
})

metricBtn.addEventListener('change', (e) =>{
    if(e.target.checked) {
        nameSpace.units = 'metric'
        nameSpace.tempUnits = '\u2103'
        nameSpace.speedUnits = ' m/s'
        getWeather(nameSpace.searchText, nameSpace.units)
    }
})
getWeather()