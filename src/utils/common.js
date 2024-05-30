const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {
  updateItem,
  isEscapeKey
};
