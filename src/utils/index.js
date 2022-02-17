export const isFalsy = (value) => {
  return value === 0 ? false : !value;
};

export const cleanObject = (object) => {
  const result = { ...object };
  for (const key in result) {
    if (isFalsy(result[key])) {
      delete result[key];
    }
  }
  return result;
};
