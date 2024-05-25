import { getRandomOffers } from '../mock/offers';
import { EVENT_TYPES } from '../const';

export default class OfferModel {
  #offers = [];

  constructor() {
    EVENT_TYPES.forEach((type) => {
      const offersByType = getRandomOffers(type);
      this.#offers.push(offersByType);
    });
  }

  getOfferByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOffers() {
    return this.#offers;
  }
}
