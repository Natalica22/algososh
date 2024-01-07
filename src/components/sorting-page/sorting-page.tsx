import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
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
          <Button text='Новый массив' extraClass={styles.button} />
        </div>
        <div className={styles.columns}>
          {[1, 50, 0, 10, 45, 100].map((elem, i) => <Column index={elem} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
