import Node from './Node.js';

export default class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.nextNode = newNode;
    this.tail = newNode;
    this.length += 1;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;
    this.length += 1;
    return this;
  }

  size() {
    return this.length;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index < 0) return 'index must be greater than zero';
    if (index >= this.length) return 'index out of bounds';

    if (index === 0) return this.head;
    if (index === this.length - 1) return this.tail;

    let node = this.head;

    for (let i = 1; i <= index; i += 1) {
      node = node.nextNode;
    }

    return node;
  }

  pop() {
    const last = this.at(this.length - 2);
    last.nextNode = null;
    this.tail = last;
    this.length -= 1;
    return this;
  }

  shift() {
    if (this.length === 1) return this;
    const newHead = this.at(1);
    this.head = newHead;
    return this;
  }

  contains(value) {
    let node = this.head;

    while (node.nextNode !== null) {
      if (node.value === value) return true;
      node = node.nextNode;
    }

    return false;
  }

  find(value) {
    let node = this.head;
    let index = 0;

    while (node.nextNode !== null) {
      if (node.value === value) return index;
      node = node.nextNode;
      index += 1;
    }

    return null;
  }

  toString() {
    let node = this.head;
    let string = '';

    while (node.nextNode !== null) {
      string += `( ${node.value} ) -> `;
      node = node.nextNode;
    }

    string += `( ${node.value} ) -> null`;
    return string;
  }

  insertAt(value, index) {
    if (index < 0) console.error('index must be greater than zero');
    if (index > this.length) console.error('index out of bounds');
    if (index === 0) {
      this.prepend(value);
      return this;
    }
    if (index === this.length) {
      this.append(value);
      return this;
    }

    const leftNode = this.at(index - 1);
    const rightNode = this.at(index);
    const insertedNode = new Node(value, rightNode);
    leftNode.nextNode = insertedNode;
    this.length += 1;
    return this;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) return this;
    if (index === this.length - 1) {
      this.pop();
      return this;
    }
    if (index === 0) {
      this.shift();
      return this;
    }

    const leftNode = this.at(index - 1);
    const rightNode = this.at(index + 1);
    leftNode.nextNode = rightNode;
    return this;
  }
}
