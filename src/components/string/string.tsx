import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Value } from "../../types/value";

export const StringComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLoader, setIsLoader] = useState(false);

  const [letters, setLetters] = useState([] as Value<string>[]);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    setDisabled(value.length === 0);
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    reverseString();
  }

  const reverseString = async () => {
    setIsLoader(true);
    const lettersArray = text.split('').map(e => {
      return { value: e, state: ElementStates.Default }
    });
    setLetters([...lettersArray]);
    await delay(1000);

    for (let i = 0; i < lettersArray.length / 2; i++) {
      const j = lettersArray.length - i - 1;
      lettersArray[i].state = ElementStates.Changing;
      lettersArray[j].state = ElementStates.Changing;
      setLetters([...lettersArray]);
      await delay(1000);

      const temp = lettersArray[i];
      lettersArray[i] = lettersArray[j];
      lettersArray[j] = temp;

      lettersArray[i].state = ElementStates.Modified;
      lettersArray[j].state = ElementStates.Modified;
    }

    setLetters([...lettersArray]);

    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <Input maxLength={11} isLimitText={true} onChange={onInputChanged} />
          <Button text='Развернуть' disabled={disabled} isLoader={isLoader} type='submit' />
        </form>
        <div className={styles.circles}>
          {letters.map((elem, i) => <Circle letter={elem.value} state={elem.state} key={i} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
