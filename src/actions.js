export function addTransform(type) {
  return {
    type: 'ADD_TRANSFORM',
    payload: type,
  };
}

export function mutateTransform(which, value) {
  return {
    type: 'MUTATE_TRANSFORM',
    payload: {
      which,
      value,
    },
  };
}

export function reorder(newOrder) {
  return {
    type: 'REORDER',
    payload: newOrder,
  };
}

export function reset() {
  return {
    type: 'RESET',
  };
}

export function removeTransform(which) {
  return {
    type: 'REMOVE',
    payload: which
  };
}
