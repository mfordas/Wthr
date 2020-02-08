import UserLocation from '../js/userLocation';

const userLocationObject = new UserLocation(51.07143, 16.99369);

test('Constructor test', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    expect(newLocation).toEqual({
        _lat: 52.22977,
        _lon: 21.01178,
        city: ''
    });
})

test('Set Lat value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    newLocation.setLat(51.107883);
    expect(newLocation._lat).toBe(51.107883);
})

test('Set Lon value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    newLocation.setLon(17.038538);
    expect(newLocation._lon).toBe(17.038538);
})

test('Set City value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    newLocation.setCity('Warszawa');
    expect(newLocation.city).toBe('Warszawa');
})

test('Get Lat value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    expect(newLocation.getLat()).toBe(52.22977);
})

test('Get Lon value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    expect(newLocation.getLon()).toBe(21.01178);
})

test('Get City value', () => {
    const newLocation = new UserLocation(52.22977, 21.01178);
    newLocation.setCity('Warszawa');
    expect(newLocation.getCity()).toBe('Warszawa');
})


test('Get city name by coordinates', async () => {
    expect.assertions(1);
    const data = await userLocationObject.getCityNameByCoordinates(51.07143, 16.99369);
    expect(data.city).toBe('Wrocław');
})


test('Get coordinates by city name', async () => {
    expect.assertions(1);
    const data = await userLocationObject.getCityCoordinatesByName(`Wrocław`);
    expect(data.latt).toBe(51.07143);
    // expect(data.longt).toBe(16.99369);
})


