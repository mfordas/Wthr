import Weather from '../js/weather';

const weather = new Weather(51.07143, 16.99369);

test('Constructor test', () => {
    const newWeather = new Weather(52.22977, 21.01178);
    expect(newWeather).toEqual({
        _lat: 52.22977,
        _lon: 21.01178,
        _src: ''
    });
})

test('Set Lat value', () => {
    const newWeather = new Weather(52.22977, 21.01178);
    newWeather.setLat(51.107883);
    expect(newWeather._lat).toBe(51.107883);
})

test('Set Lon value', () => {
    const newWeather = new Weather(52.22977, 21.01178);
    newWeather.setLon(17.038538);
    expect(newWeather._lon).toBe(17.038538);
})

test('Set Src value', () => {
    const newWeather = new Weather(52.22977, 21.01178);
    newWeather.setSrc('../img/sun.png');
    expect(newWeather._src).toBe('../img/sun.png');
})


test('Set url', () => {
    expect(weather.setURL()).toBe(`https://api.openweathermap.org/data/2.5/weather?lat=51.07143&lon=16.99369&units=metric&APPID=47f83ac09c8aba4209901acd619fdb03`)
})
