const addMinutes = (date: Date | string, minutes: number) => {
  const dateCopy = new Date(date);

  dateCopy.setMinutes(dateCopy.getMinutes() + minutes);

  return dateCopy;
};

export default addMinutes;
