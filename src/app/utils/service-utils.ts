export const dateToSqlDateTime = (date: Date): string => {
  return date.toISOString().slice(0, -1) + '+00:00';
};

export const dateToSqlDate = (date: Date): string => {
  const newDate = date.toISOString().slice(0, -14)

  console.log("SQL DATE: " + newDate);

  return newDate;
};

export const dateToSqlTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const newTime = `${hours}:${minutes}:00`;

  console.log("SQL TIME: " + newTime);

  return newTime;
};
