import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.menu_row}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} />
            <Button text='Добавить в head' extraClass={styles.button} />
            <Button text='Добавить в tail' extraClass={styles.button} />
            <Button text='Удалить из head' extraClass={styles.button} />
            <Button text='Удалить из tail' extraClass={styles.button} />
          </div>
          <div className={styles.menu_row}>
            <Input placeholder='Введите индекс' extraClass={styles.input} />
            <Button text='Добавить по индексу' extraClass={styles.big_button} />
            <Button text='Удалить по индексу' extraClass={styles.big_button} />
          </div>
        </div>
        <div className={styles.list}>
          {[1, 2, 3, 4].map((elem, i) => {
            return (<div key={i} className={styles.list_elem}>
              {(i === 1) && <Circle isSmall={true} extraClass={styles.top_circle} />}
              {(i === 2) && <Circle isSmall={true} extraClass={styles.bottom_circle} />}
              <Circle letter={elem.toString()} index={i} head={i === 0 ? 'head' : ''} tail={i === 3 ? 'tail' : ''} />
              {(i !== 3) && <ArrowIcon />}
            </div>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
