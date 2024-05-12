import { getRandomCity } from '../mock/city';
import { DESTINATION_COUNT } from '../const';

export default class CityModel {
  #cities = null;

  constructor() {
    this.#cities = Array.from({ length: DESTINATION_COUNT }, (_, i) => getRandomCity(i));
  }

  getCityById(id) {
    return this.#cities.find((city) => city.id === id);
  }

  getCities() {
    return this.#cities;
  }
}
