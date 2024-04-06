import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { EVENT_TYPES, OFFERS, PriceRange } from '../const.js';

function getRandomOffer() {
  return {
    'id': crypto.randomUUID(),
    'type': getRandomArrayElement(EVENT_TYPES),
    'title': getRandomArrayElement(OFFERS),
    'price': getRandomInteger(PriceRange.MIN, PriceRange.MAX)
  };
}

export { getRandomOffer };
