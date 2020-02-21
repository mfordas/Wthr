import Weather from './weather';
import UserLocation from './userLocation';
import * as Script from './googleAnalytics'
import '../css/main.css';


const defaultCity = {
  country: 'PL',
  name: 'Warszawa',
  lat: '52.22977',
  lon: '21.01178',
};

const weather = new Weather(defaultCity.lat, defaultCity.lon);
const userLocation = new UserLocation(defaultCity.lat, defaultCity.lon);

weather.icons();
userLocation.icons();

userLocation.getUserLocation()
  .then(data => {
    userLocation.setLat(data.lat);
    userLocation.setLon(data.lon);
    let city = userLocation.getCityNameByCoordinates(data.lat, data.lon).then(data => {
      userLocation.changeLocationByCoordinates(data);
      return data.city
    });
    userLocation.setCity(city);
    weather.reload(userLocation._lat, userLocation._lon);
  }).catch(err => document.getElementById('city').innerHTML = 'Please share you location');
weather.apiCall(weather.setURL());

const getCoordinatesByName = () => userLocation.getCityCoordinatesByName(changeCityInput.value).then(data => {
  if (data.error === undefined){
  userLocation.changeLocationByName(data);
  userLocation.setLat(data.latt);
  userLocation.setLon(data.longt);
  userLocation.setCity(data.standard.city);
  weather.reload(userLocation._lat, userLocation._lon);
  hideCityInput.classList.add('hide');
} else {
    document.getElementById('city').innerHTML = 'City not found';
    document.getElementById('country').innerHTML = ', try again';
  }
}).catch(err => err);

const showCityInput = document.getElementById("location-container");
const changeCityInput = document.getElementById("input");
const changeCityInputButton = document.getElementById("icon-confirm");
const hideCityInput = document.getElementById("input-container");

showCityInput.addEventListener('click', () => hideCityInput.classList.remove('hide'));
changeCityInput.addEventListener('click', () => changeCityInput.value = '');
changeCityInput.addEventListener('change', getCoordinatesByName);

changeCityInputButton.addEventListener('click', getCoordinatesByName);


Script.loadScript();