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
    this._lat = lat;
    this._lon = lon;
    this._src = ''
  }
  setLat(value) {
    return (this._lat = value);
  }
  setLon(value) {
    return (this._lon = value);
  }
  setSrc(value) {
    return (this._src = value);
  }

  // set URL address for API call
  setURL() {
    let weatherApiKey = '47f83ac09c8aba4209901acd619fdb03';
    let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this._lat}&lon=${this._lon}&units=metric&APPID=${weatherApiKey}`;
    return weatherApiURL;
  }

  chooseIcon(iconCode) {
    switch (iconCode) {
      case '01d':
        return this.setSrc(sunSrc);
      case '01n':
        return this.setSrc(nightSrc);
      case '02d':
        return this.setSrc(weatherSrc);
      case '02n':
        return this.setSrc(moonSrc);
      case '03d':
      case '03n':
        return this.setSrc(cloudSrc);
      case '04d':
      case '04n':
        return this.setSrc(cloudySrc);
      case '09d':
      case '09n':
        return this.setSrc(rainSrc);
      case '10d':
        return this.setSrc(weather2Src);
      case '10n':
        return this.setSrc(atmospheric2Src);
      case '11d':
        return this.setSrc(stormSrc);
      case '11n':
        return this.setSrc(atmosphericSrc);
      case '13d':
      case '13n':
        return this.setSrc(snowflakeSrc);
      case '50d':
        return this.setSrc(fogSrc);
      case '50n':
        return this.setSrc(foggySrc);
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
        icon.src = `${this._src}`;
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