import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { DESTINATIONS, DESCRIPTION, IMAGE_URL, ImageCount } from '../const.js';

function getRandomCity() {
  return {
    'id': crypto.randomUUID(),
    'name': getRandomArrayElement(DESTINATIONS),
    'photo': `${IMAGE_URL}${getRandomInteger(ImageCount.MIN, ImageCount.MAX)}`,
    'description': getRandomArrayElement(DESCRIPTION.split('.')).repeat(getRandomInteger(1, 5))
  };
}

export { getRandomCity };
