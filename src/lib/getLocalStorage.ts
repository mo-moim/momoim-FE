export const getLocalStorageData = (key: string) => {
  const getData = localStorage.getItem(key);
  return getData ? JSON.parse(getData) : null;
};
