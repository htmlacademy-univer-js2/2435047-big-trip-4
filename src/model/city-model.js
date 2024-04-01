import { getRandomCity } from '../mock/city';
import { DESTINATION_COUNT } from '../const';

export default class CityModel {
  #cities = null;

  constructor() {
    this.#cities = Array.from({ length: DESTINATION_COUNT }, getRandomCity);
  }

  getCityById(id) {
    this.#cities.forEach((city) => {
      if (city.id === id) {
        return city;
      }
    });

    return '';
  }

  getCityDescById(id) {
    this.#cities.forEach((city) => {
      if (city.id === id) {
        return city.description;
      }
    });

    return '';
  }

  getCities() {
    return this.#cities;
  }
}
