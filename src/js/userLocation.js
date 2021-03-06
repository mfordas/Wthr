const fetch = require('node-fetch');
const userCity = document.getElementById('city');
const userCountry = document.getElementById('country');

const locationIcon = document.getElementById('icon-location');
const confirmIcon = document.getElementById('icon-confirm');



import locationSrc from '../img/pin.png';
import confirmSrc from '../img/checked.png';

class UserLocation {
  constructor(lat, lon) {
    this._lat = lat;
    this._lon = lon;
    this.city = '';
  }

  icons(){
    locationIcon.src = `${locationSrc}`;
    confirmIcon.src = `${confirmSrc}`;
  }


  setLat(latValue) {
    this._lat = latValue;
  }
  setLon(lonValue) {
    this._lon = lonValue;
  }
  setCity(cityValue) {
    this.city = cityValue;
  }
  getLat() {
    return this._lat;
  }
  getLon() {
    return this._lon;
  }
  getCity() {
    return this.city;
  }

  changeLocationByName(data) {
    return userCity.innerHTML = `${data.standard.city}`, userCountry.innerHTML = `, ${data.standard.prov}`;
  }
  changeLocationByCoordinates(data) {
    return userCity.innerHTML = `${data.city}`, userCountry.innerHTML = `, ${data.prov}`;
  }

  getCityNameByCoordinates(lat, lon) {
    return new Promise(function (resolve, reject) {
      fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  getCityCoordinatesByName(cityName) {
    return new Promise(function (resolve, reject) {
      fetch(`https://geocode.xyz/?locate=${cityName}&geoit=json`)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch((data) => {
          reject(data);
        });
    });
  };

  getUserLocation() {
    return new Promise(function (resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(
        async position => {
            let lat = Math.round(position.coords.latitude * 100000) / 100000;
            let lon = Math.round(position.coords.longitude * 100000) / 100000;
            lat = lat.toString();
            lon = lon.toString();
            for (let i = lat.length - 1; i >= 1; i--) {
              if (lat[i - 1] !== '.') {
                if (lat[i] === '0') {
                  lat.pop();
                } else {
                  break;
                }
              }
            }
            for (let i = lon.length - 1; i >= 1; i--) {
              if (lon[i - 1] !== '.') {
                if (lon[i] === '0') {
                  lon.pop();
                } else {
                  break;
                }
              }
            }
            resolve({
              lat,
              lon
            });
          },
          err => {
            reject(err);
          },
      );
    });
  };




}

export default UserLocation;