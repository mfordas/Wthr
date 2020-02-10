import Weather from './weather';
import UserLocation from './userLocation';
import '../css/main.css';


const defaultCity = {
  country: 'PL',
  name: 'Warsaw',
  lat: '52.22977',
  lon: '21.01178',
};

const weather = new Weather(defaultCity.lat, defaultCity.lon);
const userLocation = new UserLocation(defaultCity.lat, defaultCity.lon);

weather.icons();

userLocation.getUserLocation()
  .then(async data => {
    userLocation.setLat(data.lat);
    userLocation.setLon(data.lon);
    let city = await userLocation.getCityNameByCoordinates(data.lat, data.lon).then(data => {userLocation.changeLocationByCoordinates(data); return data.city});
    userLocation.setCity(city);
    weather.reload(userLocation._lat, userLocation._lon);
  }).catch(err => console.log('Errror'));
weather.apiCall(weather.setURL());


const showCityInput = document.getElementById("location-container");
const changeCityInput = document.getElementById("input");
const hideCityInput = document.getElementById("input-container");

showCityInput.addEventListener('click', () => hideCityInput.classList.remove('hide'));
changeCityInput.addEventListener('click', () =>  changeCityInput.value = '');

changeCityInput.addEventListener('change', () => userLocation.getCityCoordinatesByName(changeCityInput.value).then(async data => {
  userLocation.changeLocationByName(data);
  userLocation.setLat(data.latt);
  userLocation.setLon(data.longt);
  userLocation.setCity(data.standard.city);
  weather.reload(userLocation._lat, userLocation._lon);
  hideCityInput.classList.add('hide');
}).catch(err => console.log('Errror')));
