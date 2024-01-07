import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form}>
          <Input maxLength={11} isLimitText={true} />
          <Button text='Развернуть' disabled={false} isLoader={false} />
        </form>
        <div className={styles.circles}>
          {['1', '2', '3'].map(elem => <Circle letter={elem} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
