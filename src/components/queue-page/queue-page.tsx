import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";

type Value = {
  value: string;
  state: ElementStates;
}

const MAX_QUEUE_SIZE = 7;

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<Value>(MAX_QUEUE_SIZE), []);
  const [text, setText] = useState('');
  const [queueView, setQueueView] = useState(queue.toArray());
  const [enqueueInProgress, setEnqueueInProgress] = useState(false);
  const [dequeueInProgress, setDequeueInProgress] = useState(false);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
  }

  const onEnqueueClick = async (event: React.MouseEvent<HTMLElement>) => {
    setEnqueueInProgress(true);

    queue.enqueue({ value: text, state: ElementStates.Default });

    setQueueView([...queue.toArray()]);

    setText('');
    setEnqueueInProgress(false);
  }

  const onDequeueClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDequeueInProgress(true);

    queue.dequeue();

    setQueueView([...queue.toArray()]);
    setDequeueInProgress(false);
  }

  const onClearClick = async (event: React.MouseEvent<HTMLElement>) => {
    queue.clear();

    setQueueView(queue.toArray());
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container} >
        <div className={styles.menu}>
          <div className={styles.input_panel}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input}
              onChange={onInputChanged} value={text} disabled={queue.getSize() === MAX_QUEUE_SIZE} />
            <Button text='Добавить' extraClass={styles.button} disabled={text.length === 0 || dequeueInProgress || queue.getSize() === MAX_QUEUE_SIZE}
              onClick={onEnqueueClick} />
            <Button text='Удалить' extraClass={styles.button} disabled={enqueueInProgress || queue.getSize() === 0}
              onClick={onDequeueClick} />
          </div>
          <Button text='Очистить' extraClass={styles.button} onClick={onClearClick}
            disabled={(queue.getSize() === 0 && queue.isEmpty()) || enqueueInProgress || dequeueInProgress} />
        </div>
        <div className={styles.queue}>
          {queueView.map((elem, i) => <Circle letter={elem.value?.value} state={elem.value?.state}
            key={i} index={i} head={elem.head ? 'head' : ''} tail={elem.tail ? 'tail' : ''} />)}
        </div>
      </div>
    </SolutionLayout>
  );
};
