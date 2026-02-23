import Node from "./Node";

export default class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: T): this {
    const newNode = new Node(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  prepend(value: T): this {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.length += 1;
    return this;
  }

  size(): number {
    return this.length;
  }

  getHead(): T | null | undefined {
    return this.head !== null ? this.head.value : undefined;
  }

  getTail(): T | null | undefined {
    return this.tail !== null ? this.tail.value : undefined;
  }

  private nodeAt(index: number): Node<T> | null {
    if (index < 0 || index >= this.length || this.head === null) return null;
    let node: Node<T> = this.head;
    for (let i = 0; i < index; i += 1) {
      if (node.nextNode === null) return null;
      node = node.nextNode;
    }
    return node;
  }

  at(index: number): T | null | undefined {
    const node = this.nodeAt(index);
    return node !== null ? node.value : undefined;
  }

  // Removes the head node and returns its value. Returns undefined on empty list.
  pop(): T | null | undefined {
    if (this.head === null) return undefined;
    const value = this.head.value;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.nextNode ?? null;
    }
    this.length -= 1;
    return value;
  }

  contains(value: T): boolean {
    let node = this.head;
    while (node !== null) {
      if (node.value === value) return true;
      node = node.nextNode;
    }
    return false;
  }

  findIndex(value: T): number {
    let node = this.head;
    let index = 0;
    while (node !== null) {
      if (node.value === value) return index;
      node = node.nextNode;
      index += 1;
    }
    return -1;
  }

  toString(): string {
    if (this.head === null) return '';

    let node: Node<T> = this.head;
    let string = '';

    while (node.nextNode !== null) {
      string += `( ${node.value} ) -> `;
      node = node.nextNode;
    }

    string += `( ${node.value} ) -> null`;
    return string;
  }

  insertAt(index: number, ...values: T[]): this {
    if (index < 0 || index > this.length) throw new RangeError('index out of bounds');

    for (const [i, value] of values.entries()) {
      const insertIndex = index + i;

      if (insertIndex === 0) {
        this.prepend(value);
      } else if (insertIndex === this.length) {
        this.append(value);
      } else {
        const leftNode = this.nodeAt(insertIndex - 1);
        if (leftNode === null) continue;
        const newNode = new Node(value, leftNode.nextNode);
        leftNode.nextNode = newNode;
        this.length += 1;
      }
    }

    return this;
  }

  removeAt(index: number): this {
    if (index < 0 || index >= this.length) throw new RangeError('index out of bounds');

    if (index === 0) {
      this.pop();
      return this;
    }

    const leftNode = this.nodeAt(index - 1);
    if (leftNode === null || leftNode.nextNode === null) return this;
    const removedNode = leftNode.nextNode;
    leftNode.nextNode = removedNode.nextNode;

    // If we removed the tail, update the tail pointer
    if (removedNode.nextNode === null) {
      this.tail = leftNode;
    }

    this.length -= 1;
    return this;
  }
}
