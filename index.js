import LinkedList from './LinkedList.js';
import Node from './Node.js';

const myList = new LinkedList(new Node(0));

myList.append(1);
myList.append(2);
myList.append(3);
myList.append(4);
myList.append(5);

myList.prepend(-1);
myList.prepend(-2);
myList.prepend(-3);
myList.prepend(-4);

myList.pop();
myList.pop();
myList.pop();

console.log(myList);

console.log('at index 0: ', myList.at(0));
console.log('at index 1: ', myList.at(1));
console.log('at index 2: ', myList.at(2));
console.log('at index 3: ', myList.at(3));
console.log('at index 4: ', myList.at(4));
console.log('at index 5: ', myList.at(5));
console.log('at index 6: ', myList.at(6));
console.log('at index 7: ', myList.at(7));
console.log('at index 8: ', myList.at(8));
console.log('at index 9: ', myList.at(9));

console.log(myList.contains(-1));
console.log(myList.contains(1));
console.log(myList.contains(99));

console.log('-1 is in :', myList.find(-1));
console.log('1 is in :', myList.find(1));
console.log('-3 is in :', myList.find(-3));
console.log('5 is in :', myList.find(5));

console.log(myList.toString());

myList.insertAt(789, 4);
myList.insertAt(99, 0);
myList.insertAt(695, 9);

console.log(myList.toString());

myList.removeAt(0);
console.log(myList.toString());

myList.removeAt(4);
console.log(myList.toString());

myList.removeAt(7);
console.log(myList.toString());

myList.removeAt(-5);
console.log(myList.toString());
