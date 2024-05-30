export default class OfferModel {
  #offers = [];
  #pointApiService = null;

  constructor(pointApiService) {
    this.#pointApiService = pointApiService;
  }

  async init() {
    this.#offers = await this.#pointApiService.offers;
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  get offers() {
    return this.#offers;
  }
}
