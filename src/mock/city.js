import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { DESTINATIONS, DESCRIPTION, IMAGE_URL, ImageCount } from '../const.js';

function getRandomCity(index) {
  return {
    'id': crypto.randomUUID(),
    'name': DESTINATIONS[index],
    'photo': Array.from({ length: getRandomInteger(ImageCount.MIN, ImageCount.MAX) }, () => `${IMAGE_URL}${getRandomInteger(0, 100)}`),
    'description': getRandomArrayElement(DESCRIPTION.split('.')).repeat(getRandomInteger(1, 5))
  };
}

export { getRandomCity };
