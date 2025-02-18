export const calcAge = (date: string): number => {
  const dateAge = new Date(date);
  const today = new Date();
  return (
    today.getFullYear() -
    dateAge.getFullYear() -
    (today.getMonth() < dateAge.getMonth() ||
    (today.getMonth() === dateAge.getMonth() &&
      today.getDate() < dateAge.getDate())
      ? 1
      : 0)
  );
};
