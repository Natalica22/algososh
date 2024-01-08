import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

type Value = {
  value: number;
  state: ElementStates;
}

const MAX_ARRAY_SIZE = 17;
const MIN_ARRAY_SIZE = 3;

const getRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState([] as Value[]);

  const onGenerateArrayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    randomArr();
  }

  const randomArr = () => {
    const size = getRandomFromInterval(MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    const arr = new Array<Value>(size);

    for (let i = 0; i < size; i++) {
      arr[i] = {
        value: getRandomFromInterval(0, 100),
        state: ElementStates.Default
      }
    }
    setArray([...arr]);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container} >
        <div className={styles.menu}>
          <form className={styles.method}>
            <RadioInput label='Выбор' name='method' />
            <RadioInput label='Пузырёк' name='method' />
          </form>
          <div className={styles.direction}>
            <Button text='По возрастанию' sorting={Direction.Ascending} extraClass={styles.button} />
            <Button text='По убыванию' sorting={Direction.Descending} extraClass={styles.button} />
          </div>
          <Button text='Новый массив' extraClass={styles.button} onClick={onGenerateArrayButtonClick} />
        </div>
        <div className={styles.columns}>
          {array.map((elem, i) => <Column index={elem.value} state={elem.state} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
