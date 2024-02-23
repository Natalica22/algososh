import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Value } from "../../types/value";

const MAX_STACK_SIZE = 7;

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<Value<string>>(), []);

  const [text, setText] = useState('');
  const [stackView, setStackView] = useState(stack.toArray());
  const [pushInProgress, setPushInProgress] = useState(false);
  const [popInProgress, setPopInProgress] = useState(false);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
  }

  const onPushClick = async (event: React.MouseEvent<HTMLElement>) => {
    setPushInProgress(true);

    stack.push({ value: text, state: ElementStates.Default });
    setText('');
    const arr = stack.toArray();
    arr[arr.length - 1].state = ElementStates.Changing;
    setStackView([...arr]);
    await delay();
    arr[arr.length - 1].state = ElementStates.Default;
    setStackView([...arr]);

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
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} onChange={onInputChanged} value={text} disabled={stackView.length === MAX_STACK_SIZE} data-testid='input' />
            <Button text='Добавить' extraClass={styles.button} disabled={text.length === 0 || popInProgress || stackView.length === MAX_STACK_SIZE} onClick={onPushClick} data-testid='addButton' />
            <Button text='Удалить' extraClass={styles.button} disabled={pushInProgress || stackView.length === 0} onClick={onPopClick} data-testid='deleteButton' />
          </div>
          <Button text='Очистить' extraClass={styles.button} onClick={onClearClick} disabled={stackView.length === 0 || pushInProgress || popInProgress} data-testid='clearButton' />
        </div>
        <div className={styles.stack} data-testid='circles'>
          {stackView.map((elem, i) => <Circle letter={elem.value} state={elem.state} key={i} index={i} head={i === stackView.length - 1 ? 'top' : null} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
