import dayjs from 'dayjs';

const Duration = {
  days: 3,
  hours: 12,
  minutes: 59
};

const date = dayjs().add(getRandomInteger(0, Duration.days), 'day').toDate();

function getDate({ endDateFlag }) {
  const randomDurationMins = getRandomInteger(0, Duration.minutes);
  const randomDurationHours = getRandomInteger(0, Duration.hours);
  const randomDurationDays = getRandomInteger(0, Duration.days);

  if (endDateFlag) {
    return dayjs(date)
      .add(randomDurationDays, 'day')
      .add(randomDurationHours, 'hour')
      .add(randomDurationMins, 'minute')
      .toDate();
  }

  return date;
}

function getDateDiff(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  if (Math.ceil(diff / 1440) > 1) {
    return `${Math.ceil(diff / 1440)} D`;
  }

  if (Math.ceil(diff / 60) > 1) {
    return `${Math.ceil(diff / 60)} H`;
  }
  return `${Math.ceil(diff)} M`;
}

function getTime(dt) {
  return dayjs(dt).format('hh:mm');
}

function getMonthAndDate(dt) {
  return dayjs(dt).format('MMM DD');
}

function getFullDate(dt) {
  return dayjs(dt).format('DD/MM/YY hh:mm');
}

function getRandomInteger(minimum, maximum) {
  return Math.floor(Math.random() * maximum) + minimum;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export {getRandomArrayElement, getRandomInteger, getDate, getDateDiff, getFullDate, getMonthAndDate, getTime};
