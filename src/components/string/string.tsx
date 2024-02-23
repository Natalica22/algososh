import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS } from "../../constants/delays";
import { getReversingStringSteps } from "./utils";

export const StringComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const [letters, setLetters] = useState<string[]>([]);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    setDisabled(value.length < 2);
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    reverseString();
  }

  const reverseString = async () => {
    setStepIndex(null);
    setIsLoader(true);

    const steps = getReversingStringSteps(text);

    setLetters(steps[0]);
    await delay(DELAY_IN_MS);

    for (let i = 0; i < steps.length; i++) {
      setStepIndex(i);
      setLetters(steps[i]);
      await delay(DELAY_IN_MS);
    }

    setIsLoader(false);
  }

  const getLetterState = (index: number): ElementStates => {
    if (stepIndex === null) {
      return ElementStates.Default;
    }
    const stringSize = letters.length;
    if (index < stepIndex || index > stringSize - 1 - stepIndex) {
      return ElementStates.Modified;
    }
    if (index === stepIndex || index === stringSize - 1 - stepIndex) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <Input maxLength={11} isLimitText={true} onChange={onInputChanged} data-testid='input'/>
          <Button text='Развернуть' disabled={disabled} isLoader={isLoader} type='submit' data-testid='button'/>
        </form>
        <div className={styles.circles} data-testid='circles'>
          {letters.map((elem, i) => <Circle letter={elem} state={getLetterState(i)} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
