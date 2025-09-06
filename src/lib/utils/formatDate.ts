export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);

  const year = date.getFullYear().toString().slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};
