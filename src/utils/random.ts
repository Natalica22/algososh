const getRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createArray = (minSize: number, maxSize: number, minValue: number, maxValue: number) => {
  const size = getRandomFromInterval(minSize, maxSize);
  const arr = new Array<number>(size);

  for (let i = 0; i < size; i++) {
    arr[i] = getRandomFromInterval(minValue, maxValue);
  }
  return arr;
}