export class Stack<T> {
  private container: T[] = [];

  push(item: T) {
    this.container.push(item);
  }

  pop() {
    this.container.pop();
  }

  clear() {
    this.container = [];
  }

  toArray(): T[] {
    return [...this.container];
  }
}