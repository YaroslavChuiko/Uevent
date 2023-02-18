const subtractHours = (date: Date | string, hours: number) => {
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() - hours);

  return dateCopy;
};

export default subtractHours;
