import { swap } from "../../utils/array";

export const getReversingStringSteps = (string: string) => {
  const letters = string.toUpperCase().split('');
  const steps: string[][] = [[...letters]];

  if (letters.length < 2) {
    return steps;
  }

  for (let i = 0; i < letters.length / 2; i++) {
    const j = letters.length - i - 1;

    const nextStep = [...steps[steps.length - 1]];
    swap(nextStep, i, j);
    steps.push(nextStep);
  }

  return steps;
}