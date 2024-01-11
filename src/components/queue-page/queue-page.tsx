import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container} >
        <div className={styles.menu}>
          <div className={styles.input_panel}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} />
            <Button text='Добавить' extraClass={styles.button} />
            <Button text='Удалить' extraClass={styles.button} />
          </div>
          <Button text='Очистить' extraClass={styles.button} />
        </div>
        <div className={styles.queue}>
          {[1, 2, 3, 4, 5, 6, 7].map((elem, i) => <Circle letter={elem.toString()} key={i} index={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
