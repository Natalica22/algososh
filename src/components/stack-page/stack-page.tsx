import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";

type Value = {
  value: string;
  state: ElementStates;
}

const MAX_STACK_SIZE = 7;

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<Value>(), []);

  const [text, setText] = useState('');
  const [stackView, setStackView] = useState([] as Value[]);
  const [pushInProgress, setPushInProgress] = useState(false);
  const [popInProgress, setPopInProgress] = useState(false);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
  }

  const onPushClick = async (event: React.MouseEvent<HTMLElement>) => {
    setPushInProgress(true);

    stack.push({ value: text, state: ElementStates.Default });
    const arr = stack.toArray();
    arr[arr.length - 1].state = ElementStates.Changing;
    setStackView([...arr]);
    await delay();
    arr[arr.length - 1].state = ElementStates.Default;
    setStackView([...arr]);

    setText('');
    setPushInProgress(false);
  }

  const onPopClick = async (event: React.MouseEvent<HTMLElement>) => {
    setPopInProgress(true);
    const arr = stack.toArray();
    arr[arr.length - 1].state = ElementStates.Changing;
    setStackView([...arr]);
    await delay();
    stack.pop();

    setStackView(stack.toArray());
    setPopInProgress(false);
  }

  const onClearClick = async (event: React.MouseEvent<HTMLElement>) => {
    stack.clear();

    setStackView(stack.toArray());
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container} >
        <div className={styles.menu}>
          <div className={styles.input_panel}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} onChange={onInputChanged} value={text} disabled={stackView.length === MAX_STACK_SIZE} />
            <Button text='Добавить' extraClass={styles.button} disabled={text.length === 0 || popInProgress || stackView.length === MAX_STACK_SIZE} onClick={onPushClick} />
            <Button text='Удалить' extraClass={styles.button} disabled={pushInProgress || stackView.length === 0} onClick={onPopClick} />
          </div>
          <Button text='Очистить' extraClass={styles.button} onClick={onClearClick} disabled={stackView.length === 0 || pushInProgress || popInProgress} />
        </div>
        <div className={styles.stack}>
          {stackView.map((elem, i) => <Circle letter={elem.value} state={elem.state} key={i} index={i} head={i === stackView.length - 1 ? 'top' : null} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
