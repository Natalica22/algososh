import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

const MAX_STACK_SIZE = 7;

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container} >
        <div className={styles.menu}>
          <div className={styles.input_panel}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} />
            <Button text='Добавить' extraClass={styles.button} />
            <Button text='Удалить' extraClass={styles.button} />
          </div>
          <Button text='Очистить' extraClass={styles.button} />
        </div>
        <div className={styles.stack}>
          {[1, 23, 345, 6574].map((elem, i) => <Circle letter={elem.toString()} key={i} index={i} head={i === 3 ? 'top' : null}/>)}
        </div>
      </div>
    </SolutionLayout>
  );
};
