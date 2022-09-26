export const dateToBackendDateTime = (date: Date): string => {
  const year = `${date.getFullYear()}`;
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const time = `${date.toTimeString().slice(0, 5)}`;

  return `${year}-${month}-${day}T${time}`;
};

export const dateToStringDateTime = (date: Date): string => {
  // Month is an index from 0 to 11, that's why the + 1
  return `${date.getDate()} del ${date.getMonth() + 1} de ${date.getFullYear()} a las ${date
    .toTimeString()
    .slice(0, 8)}`;
};
