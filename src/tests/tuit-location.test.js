import { initialize, Map, Marker, mockInstances } from '@googlemaps/jest-mocks';

describe('createGoogleMapsMock', () => {
  beforeEach(() => {
    initialize();
  });

  test('tuit renders address at the bottom', () => {
    const map = new google.maps.Map(null);
    const markerOne = new google.maps.Marker();
    const markerTwo = new google.maps.Marker();

    map.setHeading(8);
    markerOne.setMap(map);
    markerTwo.setLabel('My marker');

    const mapMocks = mockInstances.get(Map);
    const markerMocks = mockInstances.get(Marker);

    expect(mapMocks).toHaveLength(1);
    expect(markerMocks).toHaveLength(2);
    expect(mapMocks[0].setHeading).toHaveBeenCalledWith(8);
    expect(markerMocks[0].setMap).toHaveBeenCalledTimes(1);
    expect(markerMocks[1].setLabel).toHaveBeenCalledWith('My marker');
  });
});
