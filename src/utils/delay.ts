import { SHORT_DELAY_IN_MS } from "../constants/delays";

export function delay(ms: number = SHORT_DELAY_IN_MS) {
  return new Promise(resolve => setTimeout(resolve, ms));
}