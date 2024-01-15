import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Value } from "../../types/value";

enum SortingMethod {
  Selection = "selection",
  Bubble = "bubble"
}

const MAX_ARRAY_SIZE = 17;
const MIN_ARRAY_SIZE = 3;

const swap = (arr: Value<number>[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const getRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState([] as Value<number>[]);
  const [method, setMethod] = useState(SortingMethod.Selection);

  const [ascendingInProgress, setAscendingInProgress] = useState(false);
  const [descendingInProgress, setDescendingInProgress] = useState(false);

  const onGenerateArrayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    randomArr();
  }

  const randomArr = () => {
    const size = getRandomFromInterval(MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    const arr = new Array<Value<number>>(size);

    for (let i = 0; i < size; i++) {
      arr[i] = {
        value: getRandomFromInterval(0, 100),
        state: ElementStates.Default
      }
    }
    setArray([...arr]);
  }

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
    if (method === SortingMethod.Selection) {
      await selectionSort(desc);
    } else {
      await bubbleSort(desc);
    }
  }

  const selectionSort = async (desc: boolean) => {
    const arr = [...array].map(e => {
      return { ...e, state: ElementStates.Default }
    });
    const { length } = arr;

    for (let i = 0; i < length - 1; i++) {
      arr[i].state = ElementStates.Changing;
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await delay();

        if ((desc && arr[j].value > arr[maxInd].value) || (!desc && arr[j].value < arr[maxInd].value)) {
          maxInd = j;
        }
        arr[j].state = ElementStates.Default;
      }

      arr[i].state = ElementStates.Default;
      if (maxInd !== i) {
        swap(arr, i, maxInd);
      }
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;

    setArray([...arr]);
  }

  const bubbleSort = async (desc: boolean) => {
    const arr = [...array].map(e => {
      return { ...e, state: ElementStates.Default }
    });

    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        arr[i].state = ElementStates.Changing;
        arr[i + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await delay();

        if ((desc && arr[i].value < arr[i + 1].value) || (!desc && arr[i].value > arr[i + 1].value)) {
          swap(arr, i, i + 1);
        }
        arr[i].state = ElementStates.Default;
        arr[i + 1].state = ElementStates.Default;
      }
      arr[j].state = ElementStates.Modified;
    }

    arr[0].state = ElementStates.Modified;

    setArray([...arr]);
  }

  useEffect(() => randomArr(), []); 

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
          {array.map((elem, i) => <Column index={elem.value} state={elem.state} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
