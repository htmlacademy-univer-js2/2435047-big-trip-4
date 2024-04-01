import { getRandomOffer } from '../mock/offer';
import { OFFER_COUNT } from '../const';
import { getRandomInteger } from '../utils';

export default class OfferModel {
  #offers = null;

  constructor() {
    this.#offers = Array.from({ length: getRandomInteger(1, OFFER_COUNT) }, getRandomOffer);
  }

  getOfferById(id) {
    this.#offers.forEach((offer) => {
      if (offer.id === id) {
        return offer;
      }
    });

    return '';
  }

  getOffersIDs() {
    return this.#offers.map((offer) => offer.id);
  }

  getOffers() {
    return this.#offers;
  }
}
