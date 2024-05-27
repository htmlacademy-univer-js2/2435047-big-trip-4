export default class CityModel {
  #cities = [];
  #pointApiService = null;

  constructor(pointApiService) {
    this.#pointApiService = pointApiService;
  }

  async init() {
    this.#cities = await this.#pointApiService.destinations;
    return this.#cities;
  }

  getCityById(id) {
    return this.#cities.find((city) => city.id === id);
  }

  getCities() {
    return this.#cities;
  }
}
