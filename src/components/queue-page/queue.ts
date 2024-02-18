export type QueueElement<T> = {
  value: T | undefined;
  head: boolean;
  tail: boolean;
}

export class Queue<T> {
  private container: (T | undefined)[];
  private size = 0;
  private capacity: number;

  private head = -1;
  private tail = -1;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.container = Array(capacity).fill('');
  }

  enqueue(item: T) {
    if (this.size === this.capacity) {
      throw Error('queue is full');
    }

    this.tail = (this.tail + 1) % this.capacity;
    this.container[this.tail] = item;

    if (this.head === -1) {
      this.head = 0;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) {
      throw Error('queue is empty');
    }

    this.container[this.head] = undefined;
    this.size -= 1;

    if (this.size === 0) {
      this.tail = this.tail - 1;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
  }

  clear() {
    this.container = Array(this.capacity).fill('');
    this.head = -1;
    this.tail = -1;
    this.size = 0;
  }

  isEmpty() {
    return this.head === -1;
  }

  toArray(): QueueElement<T>[] {
    return this.container.map((elem, i) => {
      return { value: elem, head: i === this.head, tail: i === this.tail && elem !== undefined }
    });
  }

  getSize(): number {
    return this.size;
  }

  getTail() {
    return this.tail;
  }

  getHead() {
    return this.head;
  }
}