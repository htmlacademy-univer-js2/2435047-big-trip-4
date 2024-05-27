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

  getOfferByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOffers() {
    return this.#offers;
  }
}
