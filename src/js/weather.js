

const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');

class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
  setLat(value) {
    return (this.lat = value);
  }
  setLon(value) {
    return (this.lon = value);
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
  
  //sending API call
  apiCall(setURL) {
      console.log('works');
    fetch(setURL)
      .then(res => res.json())
      .then(data => {
        temperature.innerHTML = `${Math.round(data.main.temp)}`;
        wind.innerHTML = `${Math.round(data.wind.speed)}`;
        humidity.innerHTML = `${data.main.humidity}`;
        humidity.innerHTML = `${data.main.humidity}`;
        pressure.innerHTML = `${data.main.pressure}`;
      });
  }
}

export default Weather;
