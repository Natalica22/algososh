import { bubbleSort, selectionSort, step } from "./utils";

describe('Sorting selection', () => {
  it('asc empty array', () => {
    expect(selectionSort([], false)).toEqual([
      step([], [], null, null)
    ])
  });

  it('desc empty array', () => {
    expect(selectionSort([], true)).toEqual([
      step([], [], null, null)
    ])
  });

  it('asc one element array', () => {
    expect(selectionSort([1], false)).toEqual([
      step([1], [0], null, null)
    ])
  });

  it('desc one element array', () => {
    expect(selectionSort([1], true)).toEqual([
      step([1], [0], null, null)
    ])
  });

  it('asc', () => {
    expect(selectionSort([1, 3, 2, 6], false)).toEqual([
      step([1, 3, 2, 6], [], 0, 1),
      step([1, 3, 2, 6], [], 0, 2),
      step([1, 3, 2, 6], [], 0, 3),
      step([1, 3, 2, 6], [0], 1, 2),
      step([1, 3, 2, 6], [0], 1, 3),
      step([1, 2, 3, 6], [0, 1], 2, 3),
      step([1, 2, 3, 6], [0, 1, 2, 3], null, null)
    ])
  });

  it('desc', () => {
    expect(selectionSort([1, 3, 2, 6], true)).toEqual([
      step([1, 3, 2, 6], [], 0, 1),
      step([1, 3, 2, 6], [], 0, 2),
      step([1, 3, 2, 6], [], 0, 3),
      step([6, 3, 2, 1], [0], 1, 2),
      step([6, 3, 2, 1], [0], 1, 3),
      step([6, 3, 2, 1], [0, 1], 2, 3),
      step([6, 3, 2, 1], [0, 1, 2, 3], null, null)
    ])
  });
});

describe('Sorting bubble', () => {
  it('asc empty array', () => {
    expect(bubbleSort([], false)).toEqual([
      step([], [], null, null)
    ])
  });

  it('desc empty array', () => {
    expect(bubbleSort([], true)).toEqual([
      step([], [], null, null)
    ])
  });

  it('asc one element array', () => {
    expect(bubbleSort([1], false)).toEqual([
      step([1], [0], null, null)
    ])
  });

  it('desc one element array', () => {
    expect(bubbleSort([1], true)).toEqual([
      step([1], [0], null, null)
    ])
  });

  it('asc', () => {
    expect(bubbleSort([1, 3, 2, 6], false)).toEqual([
      step([1, 3, 2, 6], [], 0, 1),
      step([1, 2, 3, 6], [], 1, 2),
      step([1, 2, 3, 6], [], 2, 3),
      step([1, 2, 3, 6], [3], 0, 1),
      step([1, 2, 3, 6], [3], 1, 2),
      step([1, 2, 3, 6], [3, 2], 0, 1),
      step([1, 2, 3, 6], [3, 2, 1, 0], null, null),
    ])
  });

  it('desc', () => {
    expect(bubbleSort([1, 3, 2, 6], true)).toEqual([
      step([3, 1, 2, 6], [], 0, 1),
      step([3, 2, 1, 6], [], 1, 2),
      step([3, 2, 6, 1], [], 2, 3),
      step([3, 2, 6, 1], [3], 0, 1),
      step([3, 6, 2, 1], [3], 1, 2),
      step([6, 3, 2, 1], [3, 2], 0, 1),
      step([6, 3, 2, 1], [3, 2, 1, 0], null, null),
    ])
  });
});