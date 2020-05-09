export const getTodaysDate = () => {
  return new Date().toISOString().substr(0, 10);
};
