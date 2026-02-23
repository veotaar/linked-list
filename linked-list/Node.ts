export default class Node<T> {
  value: T | null;
  nextNode: Node<T> | null;

  constructor(value: T | null = null, nextNode: Node<T> | null = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
