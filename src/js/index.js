import Weather from './weather';
import UserLocation from './userLocation';
import '../css/main.css';

let defCity = {
    country: 'PL',
    name: 'Warsaw',
    lat: '52.22977',
    lon: '21.01178',
  };

const weather = new Weather(defCity.lat,defCity.lon);
const userLocation = new UserLocation(defCity.lat,defCity.lon)


userLocation.getUserLocation()
.then(async data => {
  userLocation.setLat(data.lat);
  userLocation.setLon(data.lon);
  let city = await userLocation.getCityNameByCordinates(data.lat, data.lon);
  userLocation.setCity(city);
  console.log(userLocation.city);
  reload(userLocation.lat,userLocation.lon);
}
).catch(err => console.log('Errror'));


function reload(latValue, lonValue){
  weather.setLat(latValue);
  weather.setLon(lonValue);
  weather.apiCall(weather.setURL());
}

weather.apiCall(weather.setURL());