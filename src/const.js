import { getRandomInteger } from './utils/common';

const POINT_COUNT = 8;
const OFFER_COUNT = 8;
const DESTINATION_COUNT = 7;


const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const OFFERS = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Upgrade to a business class'
];

const DESTINATIONS = [
  'New York',
  'Geneva',
  'Paris',
  'Moscow',
  'San Andreas',
  'Dubai',
  'Tokio'
];

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const IMAGE_URL = 'https://loremflickr.com/248/152?random=';

const IMAGES = [];

const ImageCount = {
  MIN: 1,
  MAX: 4
};

const PriceRange = {
  MIN: 1,
  MAX: 1500
};

const OffersCount = {
  MIN: 1,
  MAX: 5
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

for (let i = 0; i < ImageCount.MAX; i++) {
  IMAGES.push(`${IMAGE_URL}${getRandomInteger(ImageCount.MIN, ImageCount.MAX)}`);
}

export {EVENT_TYPES,
  DESCRIPTION,
  DESTINATIONS,
  IMAGE_URL,
  OFFERS,
  OffersCount,
  POINT_COUNT,
  PriceRange,
  ImageCount,
  OFFER_COUNT,
  DESTINATION_COUNT,
  IMAGES,
  FilterType,
  Mode,
  SortType
};
