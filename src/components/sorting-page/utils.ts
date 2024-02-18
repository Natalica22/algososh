import { swap } from "../../utils/array";

export type SortingStep<T> = {
  array: T[];
  sortedIndexes: number[];
  i: number | null;
  j: number | null;
}

const step = <T>(array: T[], sortedIndexes: number[], i: number | null, j: number | null) => ({
  array: [...array],
  sortedIndexes: [...sortedIndexes],
  i: i,
  j: j
});

export const selectionSort = <T>(array: T[], desc: boolean): SortingStep<T>[] => {
  const steps: SortingStep<T>[] = [];
  const sortedIndexes: number[] = [];

  const { length } = array;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if ((desc && array[j] > array[maxInd]) || (!desc && array[j] < array[maxInd])) {
        maxInd = j;
      }

      steps.push(step(array, sortedIndexes, i, j));
    }

    if (maxInd !== i) {
      swap(array, i, maxInd);
    }
    sortedIndexes.push(i);
  }
  sortedIndexes.push(length - 1);
  steps.push(step(array, sortedIndexes, null, null));

  return steps;
}

export const bubbleSort = <T>(array: T[], desc: boolean): SortingStep<T>[] => {
  const steps: SortingStep<T>[] = [];
  const sortedIndexes: number[] = [];

  for (let j = array.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if ((desc && array[i] < array[i + 1]) || (!desc && array[i] > array[i + 1])) {
        swap(array, i, i + 1);
      }

      steps.push(step(array, sortedIndexes, i, i + 1));
    }
    sortedIndexes.push(j);
  }

  sortedIndexes.push(0);
  steps.push(step(array, sortedIndexes, null, null));

  return steps;
}