function getRandomInteger(minimum, maximum) {
  return Math.floor(Math.random() * maximum) + minimum;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, getRandomInteger, updateItem };
