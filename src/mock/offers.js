import { getRandomInteger } from '../utils/common.js';
import { OFFERS, OFFER_COUNT, PriceRange } from '../const.js';

function getRandomOffers(type) {
  return {
    type: type,
    offers: Array.from({ length: OFFER_COUNT }, (_, index) => ({
      'id': crypto.randomUUID(),
      'title': OFFERS[index],
      'price': getRandomInteger(PriceRange.MIN, PriceRange.MAX)
    }))
  };
}


export { getRandomOffers };
