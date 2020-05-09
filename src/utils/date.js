export const getTodaysDate = () => {
  const today = new Date();
  today.setDate(today.getDate());
  return today.toISOString().substr(0, 10);
};
