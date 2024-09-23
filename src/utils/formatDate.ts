export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);

  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = (month).toString().padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
};
