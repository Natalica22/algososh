export const getFibonacciNumbers = (size: number) => {
  const fibonacciArray = new Array<number>();

  for (let i = 0; i < 2; i++) {
    fibonacciArray[i] = 1;
  }

  for (let i = 2; i <= size; i++) {
    fibonacciArray[i] = fibonacciArray[i - 2] + fibonacciArray[i - 1];
  }

  return fibonacciArray;
}
