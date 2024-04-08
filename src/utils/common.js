function getRandomInteger(minimum, maximum) {
  return Math.floor(Math.random() * maximum) + minimum;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export { getRandomArrayElement, getRandomInteger };
