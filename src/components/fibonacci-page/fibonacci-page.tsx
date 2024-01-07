import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.form}>
          <Input max={19} min={1} isLimitText={true} type='number' />
          <Button text='Рассчитать' disabled={false} isLoader={false} type='submit' />
        </form>
        <div className={styles.circles}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((elem, i) => <Circle letter={elem.toString()} key={i} index={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
