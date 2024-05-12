import { getRandomInteger } from '../utils/common';
import { getDate, getRandomDurationTime } from '../utils/points-utils';
import { PriceRange} from '../const';

function getRandomPoint(type, destinationId, offersIds) {
  const randTime = getRandomInteger(1, 3);
  const randomDurationTime = getRandomDurationTime();

  return {
    id: crypto.randomUUID(),
    type: type,
    basePrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
    dateFrom: getDate({ endDateFlag: false, randomTime: randTime, randomDurationTime: randomDurationTime }),
    dateTo: getDate({ endDateFlag: true, randomTime: randTime, randomDurationTime: randomDurationTime }),
    destination: destinationId,
    isFavorite: getRandomInteger(0, 2),
    offers: offersIds,
  };
}

export { getRandomPoint };
