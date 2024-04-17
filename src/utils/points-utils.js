import dayjs from 'dayjs';
import { getRandomInteger } from './common';

const Duration = {
  days: 3,
  hours: 12,
  minutes: 59
};

function getRandomDurationTime() {
  const randomDurationMins = getRandomInteger(0, Duration.minutes);
  const randomDurationHours = getRandomInteger(0, Duration.hours);
  const randomDurationDays = getRandomInteger(0, Duration.days);

  return [randomDurationMins, randomDurationHours, randomDurationDays];
}

const date = dayjs().toDate();

function getDate({ endDateFlag, randomTime, randomDurationTime: randomDurationTime }) {
  const randomDurationMins = randomDurationTime[0];
  const randomDurationHours = randomDurationTime[1];
  const randomDurationDays = randomDurationTime[2];

  if (randomTime === 1) {
    if (endDateFlag){
      return dayjs(date)
        .add(-randomDurationDays, 'day')
        .add(-randomDurationHours, 'hour')
        .add(-randomDurationMins, 'minute')
        .toDate();
    }

    return dayjs(date)
      .add(-randomDurationDays * 2, 'day')
      .add(-randomDurationHours * 2, 'hour')
      .add(-randomDurationMins * 2, 'minute')
      .toDate();
  }
  else if (randomTime === 2) {
    if (endDateFlag) {
      return dayjs(date)
        .add(randomDurationDays, 'day')
        .add(randomDurationHours, 'hour')
        .add(randomDurationMins, 'minute')
        .toDate();
    }

    return dayjs(date)
      .add(-randomDurationDays, 'day')
      .add(-randomDurationHours, 'hour')
      .add(-randomDurationMins, 'minute')
      .toDate();
  }
  else {
    if (endDateFlag) {
      return dayjs(date)
        .add(randomDurationDays * 2, 'day')
        .add(randomDurationHours * 2, 'hour')
        .add(randomDurationMins * 2, 'minute')
        .toDate();
    }

    return dayjs(date)
      .add(randomDurationDays, 'day')
      .add(randomDurationHours, 'hour')
      .add(randomDurationMins, 'minute')
      .toDate();
  }
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

function isFuturedPoint(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPresentedPoint(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function isPastedPoint(point) {
  return dayjs().isAfter(point.dateTo);
}

function sortByTime(pointA, pointB) {
  const timeFrom = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeTo = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeFrom - timeTo;
}

function sortByPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

function sortByOffers(pointA, pointB) {
  return pointA.offers.length - pointB.offers.length;
}

function sortByDay(pointA, pointB) {
  const timeA = dayjs(pointA.dateFrom);
  const timeB = dayjs(pointB.dateFrom);

  return timeA - timeB;
}

export {
  getDate,
  getDateDiff,
  getFullDate,
  getMonthAndDate,
  getTime,
  isFuturedPoint,
  isPastedPoint,
  isPresentedPoint,
  getRandomDurationTime,
  sortByDay,
  sortByOffers,
  sortByPrice,
  sortByTime,
};
