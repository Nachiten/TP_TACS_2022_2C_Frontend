export const dateToSqlDateTime = (date: Date): string => {
  return date.toISOString().slice(0, -1);
};

export const dateToSqlDate = (date: Date): string => {
  return date.toISOString().slice(0, -14);
};

export const dateToSqlTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}:00`;
};
