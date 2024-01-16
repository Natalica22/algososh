import { ElementStates } from "../types/element-states";
import { Value } from "../types/value";

export const getRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createArray = (minSize: number, maxSize: number, minValue: number, maxValue: number) => {
  const size = getRandomFromInterval(minSize, maxSize);
  const arr = new Array<Value<number>>(size);

  for (let i = 0; i < size; i++) {
    arr[i] = {
      value: getRandomFromInterval(minValue, maxValue),
      state: ElementStates.Default
    }
  }
  return arr;
}