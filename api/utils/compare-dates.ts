const compareDates = (a: Date, b: Date) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

export { compareDates };
