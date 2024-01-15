import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Value } from "../../types/value";

const MAX_LIST_SIZE = 6;

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<Value<string>>(), []);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(null as number | null);
  const [prependInProgress, setPrependInProgress] = useState(false);
  const [appendInProgress, setAppendInProgress] = useState(false);
  const [deleteHeadInProgress, setDeleteHeadInProgress] = useState(false);
  const [deleteTailInProgress, setDeleteTailInProgress] = useState(false);

  const [listView, setListView] = useState(list.toArray());

  const onTextInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
  }

  const onIndexInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueInt = parseInt(value)
    setIndex(valueInt);
  }

  const onPrependClick = async (event: React.MouseEvent<HTMLElement>) => {
    setPrependInProgress(true);
    list.prepend({ value: text, state: ElementStates.Default });
    setText('');
    await delay();

    setListView([...list.toArray()]);
    setPrependInProgress(false);
  }

  const onAppendClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAppendInProgress(true);
    list.append({ value: text, state: ElementStates.Default });
    setText('');
    await delay();

    setListView([...list.toArray()]);
    setAppendInProgress(false);
  }

  const onDeleteHeadClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDeleteHeadInProgress(true);
    list.deleteHead();
    await delay();

    setListView([...list.toArray()]);
    setDeleteHeadInProgress(false);
  }

  const onDeleteTailClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDeleteTailInProgress(true);
    list.deleteTail();
    await delay();

    setListView([...list.toArray()]);
    setDeleteTailInProgress(false);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.menu_row}>
            <Input placeholder='Введите значение' maxLength={4} isLimitText={true} extraClass={styles.input} value={text} onChange={onTextInputChanged}
              disabled={list.getSize() === MAX_LIST_SIZE || prependInProgress || appendInProgress || deleteHeadInProgress || deleteTailInProgress} />
            <Button text='Добавить в head' extraClass={styles.button} isLoader={prependInProgress} onClick={onPrependClick}
              disabled={text.length === 0 || list.getSize() === MAX_LIST_SIZE || appendInProgress || deleteHeadInProgress || deleteTailInProgress} />
            <Button text='Добавить в tail' extraClass={styles.button} isLoader={appendInProgress} onClick={onAppendClick}
              disabled={text.length === 0 || list.getSize() === MAX_LIST_SIZE || prependInProgress || deleteHeadInProgress || deleteTailInProgress} />
            <Button text='Удалить из head' extraClass={styles.button} isLoader={deleteHeadInProgress} onClick={onDeleteHeadClick}
              disabled={list.getSize() === 0 || prependInProgress || appendInProgress || deleteTailInProgress} />
            <Button text='Удалить из tail' extraClass={styles.button} isLoader={deleteTailInProgress} onClick={onDeleteTailClick}
              disabled={list.getSize() === 0 || prependInProgress || appendInProgress || deleteHeadInProgress} />
          </div>
          <div className={styles.menu_row}>
            <Input placeholder='Введите индекс' extraClass={styles.input} value={index?.toString()} onChange={onIndexInputChanged} />
            <Button text='Добавить по индексу' extraClass={styles.big_button} />
            <Button text='Удалить по индексу' extraClass={styles.big_button} />
          </div>
        </div>
        <div className={styles.list}>
          {listView.map((elem, i) => {
            return (<div key={i} className={styles.list_elem}>
              {(i === 1) && <Circle isSmall={true} extraClass={styles.top_circle} />}
              {(i === 2) && <Circle isSmall={true} extraClass={styles.bottom_circle} />}
              <Circle letter={elem.value} state={elem.state} index={i} head={i === 0 ? 'head' : ''} tail={i === listView.length - 1 ? 'tail' : ''} />
              {(i !== listView.length - 1) && <ArrowIcon />}
            </div>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
