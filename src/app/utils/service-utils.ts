export const dateToBackendDateTime = (date: Date): string => {
  return date.toISOString().slice(0, -1);
};

export const dateToBackendDate = (date: Date): string => {
  return date.toISOString().slice(0, -14);
};

export const dateToBackendTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}:00`;
};
