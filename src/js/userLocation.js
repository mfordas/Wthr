export const getUserLocation = () => {
    return new Promise(function(resolve, reject) {
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
          let city = await getCityNameByCordinates(lat, lon);
          resolve([city, lat, lon]);
        },
        err => {
          reject(err);
        },
      );
    });
  };
  
  const getCityNameByCordinates = (lat, lon) => {
    return new Promise(function(resolve, reject) {
      fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
        .then(res => res.json())
        .then(data => {
          resolve(data.city);
        })
        .catch(() => {
          reject();
        });
    });
  };