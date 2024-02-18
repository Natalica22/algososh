import { ElementStates } from "./element-states";

export type Value<T> = {
  value: T;
  state: ElementStates;
}