import { getRandomArrayElement, getRandomInteger, getDate } from '../utils';
import { EVENT_TYPES, PriceRange} from '../const';

function getRandomPoint(destinationId, offersId) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
    dateFrom: getDate({ endDateFlag: false }),
    dateTo: getDate({ endDateFlag: true }),
    destination: destinationId,
    isFavorite: false,
    offers: offersId,
    type: getRandomArrayElement(EVENT_TYPES)
  };
}

export { getRandomPoint };
