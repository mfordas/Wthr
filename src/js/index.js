import Weather from './weather';
import '../css/main.css';

let defCity = {
    country: 'PL',
    name: 'Warsaw',
    lat: '52.22977',
    lon: '21.01178',
  };

const weather = new Weather(defCity.lat,defCity.lon);



weather.apiCall(weather.setURL());