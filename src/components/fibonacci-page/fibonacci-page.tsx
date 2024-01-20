import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/delay";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [isLoader, setIsLoader] = useState(false);

  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueInt = parseInt(value)
    setNumber(valueInt);
    setDisabled(value.length === 0 || valueInt < 1 || valueInt > 19);
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    generateFibonacci();
  }


  const generateFibonacci = async () => {
    setIsLoader(true);

    const fibArray = getFibonacciNumbers(number);

    for (let i = 0; i <= number; i++) {
      setFibonacci([...fibArray.slice(0, i + 1)]);
      await delay();
    }

    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <Input max={19} min={1} isLimitText={true} type='number' onChange={onInputChanged}/>
          <Button text='Рассчитать' disabled={disabled} isLoader={isLoader} type='submit' />
        </form>
        <div className={styles.circles}>
          {fibonacci.map((elem, i) => <Circle letter={elem.toString()} key={i} index={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
