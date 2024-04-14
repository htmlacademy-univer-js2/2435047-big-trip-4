import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { getDate, getRandomDurationTime } from '../utils/points-utils';
import { EVENT_TYPES, PriceRange} from '../const';

function getRandomPoint(destinationId, offersId) {
  const randTime = getRandomInteger(1, 3);
  const randomDurationTime = getRandomDurationTime();

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
    dateFrom: getDate({ endDateFlag: false, randomTime: randTime, randomDurationTime: randomDurationTime }),
    dateTo: getDate({ endDateFlag: true, randomTime: randTime, randomDurationTime: randomDurationTime }),
    destination: destinationId,
    isFavorite: getRandomInteger(0, 2),
    offers: offersId,
    type: getRandomArrayElement(EVENT_TYPES)
  };
}

export { getRandomPoint };
