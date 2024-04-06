import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { getDate, getRandomDurationTime } from '../utils/points-utils';
import { EVENT_TYPES, PriceRange} from '../const';

function getRandomPoint(destinationId, offersId) {
  const randTimeNum = getRandomInteger(1, 3);
  const randomDurationTime = getRandomDurationTime();

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
    dateFrom: getDate({ endDateFlag: false, randomTimeNumber: randTimeNum, randomDurationTime: randomDurationTime }),
    dateTo: getDate({ endDateFlag: true, randomTimeNumber: randTimeNum, randomDurationTime: randomDurationTime }),
    destination: destinationId,
    isFavorite: false,
    offers: offersId,
    type: getRandomArrayElement(EVENT_TYPES)
  };
}

export { getRandomPoint };
