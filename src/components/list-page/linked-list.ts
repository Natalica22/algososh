class Node<T> {
  constructor(public value: T, public next: Node<T> | null) { }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  constructor(array: T[] = []) {
    array.forEach(elem => this.append(elem));
  }

  prepend(item: T) {
    const node = new Node(item, this.head);
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
    this.size += 1;
  }

  append(item: T) {
    const node = new Node(item, null);
    if (this.tail !== null) {
      this.tail.next = node;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node;
    }
    this.size += 1;
  }

  deleteHead() {
    if (this.head === null) {
      throw Error('List is empty');
    }
    this.head = this.head.next;
    this.size -= 1;
    if (this.size === 0) {
      this.tail = null;
    }
  }

  deleteTail() {
    if (this.head === null) {
      throw Error('List is empty');
    }
    let node: Node<T> | null = this.head;
    while (node !== null) {
      if (node.next === this.tail) {
        this.tail = node;
        node.next = null;
        break;
      }
      node = node.next;
    }
    this.size -= 1;
    if (this.size === 0) {
      this.tail = null;
      this.head = null;
    }
  }

  addByIndex(item: T, index: number) {
    if (index < 0 || index >= this.size) {
      throw Error('Index is out of bounds');
    }
    if (this.head === null) {
      throw Error('List is empty');
    }

    if (index === 0) {
      this.prepend(item);
      return;
    }

    let preNode: Node<T> = this.head;
    let node: Node<T> | null = this.head?.next || null;
    let count = 1;
    while (node !== null) {
      if (count === index) {
        const newNode = new Node(item, node);
        preNode.next = newNode;
        break;
      }
      preNode = node;
      node = node.next;
      count += 1;
    }
    this.size += 1;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index >= this.size) {
      throw Error('Index is out of bounds');
    }
    if (this.head === null) {
      throw Error('List is empty');
    }

    if (index === 0) {
      this.deleteHead();
      return;
    }

    let preNode: Node<T> = this.head;
    let node: Node<T> | null = this.head?.next || null;
    let count = 1;
    while (node !== null) {
      if (count === index) {
        preNode.next = node.next;
        if (preNode.next === null) {
          this.tail = preNode;
        }
        break;
      }
      preNode = node;
      node = node.next;
      count += 1;
    }
    this.size -= 1;
  }

  toArray() {
    const arr = [];
    let node = this.head;
    let count = 0;
    while (node !== null) {
      arr[count] = node.value;
      node = node.next;
      count += 1;
    }
    return arr;
  }

  getSize() {
    return this.size;
  }
}