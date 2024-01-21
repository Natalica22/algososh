import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { bubbleSort, selectionSort } from "./utils";
import { createArray } from "../../utils/random";

enum SortingMethod {
  Selection = "selection",
  Bubble = "bubble"
}

const MAX_ARRAY_SIZE = 17;
const MIN_ARRAY_SIZE = 3;

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [method, setMethod] = useState(SortingMethod.Selection);

  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);
  const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);

  const [ascendingInProgress, setAscendingInProgress] = useState(false);
  const [descendingInProgress, setDescendingInProgress] = useState(false);

  const onGenerateArrayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    randomArr();
  }

  const randomArr = () => {
    const arr = createArray(MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, 0, 100);
    setFirstIndex(null);
    setSecondIndex(null);
    setSortedIndexes([]);
    setArray([...arr]);
  }

  useEffect(() => randomArr(), []);

  const onChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMethod(value as SortingMethod);
  }

  const onAscendingClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAscendingInProgress(true);

    await sortArray(false);

    setAscendingInProgress(false);
  }

  const onDescendinClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDescendingInProgress(true);

    await sortArray(true);

    setDescendingInProgress(false);
  }

  const sortArray = async (desc: boolean) => {
    setFirstIndex(null);
    setSecondIndex(null);
    setSortedIndexes([]);
    const steps = method === SortingMethod.Selection ? selectionSort([...array], desc) : bubbleSort([...array], desc);

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setArray(step.array);
      setFirstIndex(step.i);
      setSecondIndex(step.j);
      setSortedIndexes(step.sortedIndexes);

      await delay();
    }
  }

  const getState = (index: number): ElementStates => {
    if (sortedIndexes.includes(index)) {
      return ElementStates.Modified;
    }
    if (index === firstIndex || index === secondIndex) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container} >
        <div className={styles.menu}>
          <form className={styles.method}>
            <RadioInput label='Выбор' name='method' value={SortingMethod.Selection} onChange={onChangeMethod} checked={method === SortingMethod.Selection} />
            <RadioInput label='Пузырёк' name='method' value={SortingMethod.Bubble} onChange={onChangeMethod} checked={method === SortingMethod.Bubble} />
          </form>
          <div className={styles.direction}>
            <Button text='По возрастанию' sorting={Direction.Ascending} extraClass={styles.button} onClick={onAscendingClick}
              isLoader={ascendingInProgress} disabled={descendingInProgress || array.length === 0} />
            <Button text='По убыванию' sorting={Direction.Descending} extraClass={styles.button} onClick={onDescendinClick}
              isLoader={descendingInProgress} disabled={ascendingInProgress || array.length === 0} />
          </div>
          <Button text='Новый массив' extraClass={styles.button} onClick={onGenerateArrayButtonClick} disabled={ascendingInProgress || descendingInProgress} />
        </div>
        <div className={styles.columns}>
          {array.map((elem, i) => <Column index={elem} state={getState(i)} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
