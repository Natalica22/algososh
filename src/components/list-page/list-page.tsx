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
import { createArray } from "../../utils/random";

type ValueView<T> = {
  value: Value<T>;
  insert?: Value<T> | null;
  delete?: Value<T> | null;
}

const MAX_LIST_SIZE = 6;

export const ListPage: React.FC = () => {
  const initArray = useMemo(() => createArray(3, 6, 0, 9999).map(x => {
    return { ...x, value: x.value.toString() }
  }), []);

  const list = useMemo(() => new LinkedList<Value<string>>(initArray), [initArray]);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(null as number | null);
  const [prependInProgress, setPrependInProgress] = useState(false);
  const [appendInProgress, setAppendInProgress] = useState(false);
  const [deleteHeadInProgress, setDeleteHeadInProgress] = useState(false);
  const [deleteTailInProgress, setDeleteTailInProgress] = useState(false);

  const listToView = () => {
    return list.toArray().map(elem => {
      return { value: elem }
    }) as ValueView<string>[]
  }

  const [listView, setListView] = useState([...listToView()]);

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
    let arr = listToView();
    if (arr.length !== 0) {
      arr[0].insert = { value: text, state: ElementStates.Changing }
    }
    setListView([...arr]);
    await delay();

    list.prepend({ value: text, state: ElementStates.Default });
    setText('');
    arr = listToView();
    arr[0].value.state = ElementStates.Modified;
    setListView([...arr]);
    await delay();
    arr[0].value.state = ElementStates.Default;
    setListView([...arr]);

    setPrependInProgress(false);
  }

  const onAppendClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAppendInProgress(true);
    let arr = listToView();
    if (arr.length !== 0) {
      arr[arr.length - 1].insert = { value: text, state: ElementStates.Changing };
    }
    setListView([...arr]);
    await delay();

    list.append({ value: text, state: ElementStates.Default });
    setText('');
    arr = listToView();
    arr[arr.length - 1].value.state = ElementStates.Modified;
    setListView([...arr]);
    await delay();
    arr[arr.length - 1].value.state = ElementStates.Default;
    setListView([...arr]);

    setAppendInProgress(false);
  }

  const onDeleteHeadClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDeleteHeadInProgress(true);
    const arr = listToView();
    arr[0].delete = { value: arr[0].value.value, state: ElementStates.Changing };
    arr[0].value.value = '';
    setListView([...arr]);
    await delay();

    list.deleteHead();

    setListView([...listToView()]);
    setDeleteHeadInProgress(false);
  }

  const onDeleteTailClick = async (event: React.MouseEvent<HTMLElement>) => {
    setDeleteTailInProgress(true);
    const arr = listToView();
    const lastIndex = arr.length - 1;
    arr[lastIndex].delete = { value: arr[lastIndex].value.value, state: ElementStates.Changing };
    arr[lastIndex].value.value = '';
    setListView([...arr]);
    await delay();

    list.deleteTail();

    setListView([...listToView()]);
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
              {elem.insert && <Circle isSmall={true} extraClass={styles.top_circle} letter={elem.insert.value} state={ElementStates.Changing} />}
              {elem.delete && <Circle isSmall={true} extraClass={styles.bottom_circle} letter={elem.delete.value} state={ElementStates.Changing} />}
              <Circle letter={elem.value.value} state={elem.value.state} index={i} head={i === 0 && !elem.insert ? 'head' : ''} tail={i === listView.length - 1 && !elem.delete ? 'tail' : ''} />
              {(i !== listView.length - 1) && <ArrowIcon />}
            </div>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
