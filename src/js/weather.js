const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const icon = document.getElementById('icon');
const windIcon = document.getElementById('windIcon');
const humidityIcon = document.getElementById('humidityIcon');
const pressureIcon = document.getElementById('pressureIcon');



import sunSrc from '../img/sun.png';
import weatherSrc from '../img/weather.png';
import weather2Src from '../img/weather_2.png';
import cloudSrc from '../img/cloud.png';
import cloudySrc from '../img/cloudy.png';
import rainSrc from '../img/rain.png';
import stormSrc from '../img/storm.png';
import snowflakeSrc from '../img/snowflake.png';
import fogSrc from '../img/fog.png';
import foggySrc from '../img/foggy.png';
import atmospheric2Src from '../img/atmospheric_2.png';
import atmosphericSrc from '../img/atmospheric.png';
import moonSrc from '../img/moon.png';
import nightSrc from '../img/night.png';
import gaugeSrc from '../img/gauge.png';
import humiditySrc from '../img/humidity.png';
import windSrc from '../img/wind.png';

class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.src = ''
  }
  setLat(value) {
    return (this.lat = value);
  }
  setLon(value) {
    return (this.lon = value);
  }
  setSrc(value) {
    return (this.src = value);
  }

  getCoordinates(lat, lng) {
    this.setLat(lat);
    this.setLon(lng);
    return this.apiCall(this.setURL());
  }

  // set URL address for API call
  setURL() {
    let weatherApiKey = '47f83ac09c8aba4209901acd619fdb03';
    let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${weatherApiKey}`;
    return weatherApiURL;
  }

  chooseIcon(iconCode) {
    switch (iconCode) {
      case '01d':
        this.setSrc(sunSrc);
        break;
      case '01n':
        this.setSrc(nightSrc);
        break;
      case '02d':
        this.setSrc(weatherSrc);
        break;
      case '02n':
        this.setSrc(moonSrc);
        break;
      case '03d':
      case '03n':
        this.setSrc(cloudSrc);
        break;
      case '04d':
      case '04n':
        this.setSrc(cloudySrc);
        break;
      case '09d':
      case '09n':
        this.setSrc(rainSrc);
        break;
      case '10d':
        this.setSrc(weather2Src);
        break;
      case '10n':
        this.setSrc(atmospheric2Src);
        break;
      case '11d':
        this.setSrc(stormSrc);
        break;
      case '11n':
        this.setSrc(atmosphericSrc);
        break;
      case '13d':
      case '13n':
        this.setSrc(snowflakeSrc);
        break;
      case '50d':
        this.setSrc(fogSrc);
        break;
      case '50n':
        this.setSrc(foggySrc);
        break;
      default:
        console.log('Doesnt work');
    }
  }

  //sending API call
  apiCall(setURL) {
    fetch(setURL)
      .then(res => res.json())
      .then(data => {
        temperature.innerHTML = `${Math.round(data.main.temp)}`;
        wind.innerHTML = `${Math.round(data.wind.speed)}`;
        humidity.innerHTML = `${data.main.humidity}`;
        humidity.innerHTML = `${data.main.humidity}`;
        pressure.innerHTML = `${data.main.pressure}`;
        this.chooseIcon(data.weather[0].icon);
        icon.src = `${this.src}`;
      });
  }

  reload(latValue, lonValue) {
    this.setLat(latValue);
    this.setLon(lonValue);
    this.apiCall(this.setURL());
  }

  icons(){
    windIcon.src = `${windSrc}`;
    humidityIcon.src = `${humiditySrc}`;
    pressureIcon.src = `${gaugeSrc}`;
  }

}

export default Weather;