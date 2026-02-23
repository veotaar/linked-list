import { describe, test, expect, beforeEach } from "bun:test";
import LinkedList from "./LinkedList";

describe("empty list", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test("size() === 0", () => expect(list.size()).toBe(0));
  test("getHead() === undefined", () => expect(list.getHead()).toBeUndefined());
  test("getTail() === undefined", () => expect(list.getTail()).toBeUndefined());
  test("at(0) === undefined", () => expect(list.at(0)).toBeUndefined());
  test("toString() === ''", () => expect(list.toString()).toBe(""));
  test("contains(1) === false", () => expect(list.contains(1)).toBe(false));
  test("findIndex(1) === -1", () => expect(list.findIndex(1)).toBe(-1));
  test("pop() === undefined", () => expect(list.pop()).toBeUndefined());
  test("size() still 0 after pop", () => {
    list.pop();
    expect(list.size()).toBe(0);
  });
});


describe("append", () => {
  test("increases size", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    expect(list.size()).toBe(3);
  });

  test("updates tail", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2);
    expect(list.getTail()).toBe(2);
  });

  test("sets head on first append", () => {
    const list = new LinkedList<number>();
    list.append(42);
    expect(list.getHead()).toBe(42);
  });

  test("toString is correct after several appends", () => {
    const list = new LinkedList<string>();
    list.append("dog").append("cat").append("parrot");
    expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
  });
});


describe("prepend", () => {
  test("puts value at front", () => {
    const list = new LinkedList<number>();
    list.append(2).append(3).prepend(1);
    expect(list.getHead()).toBe(1);
  });

  test("increases size", () => {
    const list = new LinkedList<number>();
    list.append(2).append(3).prepend(1);
    expect(list.size()).toBe(3);
  });

  test("does not change tail", () => {
    const list = new LinkedList<number>();
    list.append(2).append(3).prepend(1);
    expect(list.getTail()).toBe(3);
  });

  test("sets tail on first prepend", () => {
    const list = new LinkedList<number>();
    list.prepend(99);
    expect(list.getTail()).toBe(99);
  });
});


describe("at(index)", () => {
  let list: LinkedList<string>;

  beforeEach(() => {
    list = new LinkedList<string>();
    list.append("dog").append("cat").append("parrot").append("hamster").append("snake").append("turtle");
  });

  test("at(0) returns head value", () => expect(list.at(0)).toBe("dog"));
  test("at(1) returns second value", () => expect(list.at(1)).toBe("cat"));
  test("at(2) returns middle value", () => expect(list.at(2)).toBe("parrot"));
  test("at(5) returns tail value", () => expect(list.at(5)).toBe("turtle"));
  test("at(-1) returns undefined", () => expect(list.at(-1)).toBeUndefined());
  test("at(6) out of bounds returns undefined", () => expect(list.at(6)).toBeUndefined());
  test("at(99) out of bounds returns undefined", () => expect(list.at(99)).toBeUndefined());
});


describe("toString", () => {
  test("empty list returns empty string", () => {
    const list = new LinkedList<number>();
    expect(list.toString()).toBe("");
  });

  test("single element", () => {
    const list = new LinkedList<number>();
    list.append(42);
    expect(list.toString()).toBe("( 42 ) -> null");
  });

  test("full list format", () => {
    const list = new LinkedList<string>();
    list.append("dog").append("cat").append("parrot").append("hamster").append("snake").append("turtle");
    expect(list.toString()).toBe(
      "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null"
    );
  });
});


describe("contains", () => {
  let list: LinkedList<string>;

  beforeEach(() => {
    list = new LinkedList<string>();
    list.append("dog").append("cat").append("parrot").append("hamster").append("snake").append("turtle");
  });

  test("returns true for a value in the middle", () => expect(list.contains("cat")).toBe(true));
  test("returns true for the tail value", () => expect(list.contains("turtle")).toBe(true));
  test("returns true for the head value", () => expect(list.contains("dog")).toBe(true));
  test("returns false for a value not in the list", () => expect(list.contains("lion")).toBe(false));
});


describe("findIndex", () => {
  let list: LinkedList<string>;

  beforeEach(() => {
    list = new LinkedList<string>();
    list.append("dog").append("cat").append("parrot").append("hamster").append("snake").append("turtle");
  });

  test("returns 0 for the head", () => expect(list.findIndex("dog")).toBe(0));
  test("returns correct index for a middle value", () => expect(list.findIndex("parrot")).toBe(2));
  test("returns last index for the tail", () => expect(list.findIndex("turtle")).toBe(5));
  test("returns -1 when value is not found", () => expect(list.findIndex("lion")).toBe(-1));

  test("returns index of first match when duplicates exist", () => {
    const dupes = new LinkedList<string>();
    dupes.append("a").append("b").append("a");
    expect(dupes.findIndex("a")).toBe(0);
  });
});


describe("pop", () => {
  test("returns the head value", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    expect(list.pop()).toBe(1);
  });

  test("decrements size", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.pop();
    expect(list.size()).toBe(2);
  });

  test("updates head to next node", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.pop();
    expect(list.getHead()).toBe(2);
  });

  test("does not change tail", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.pop();
    expect(list.getTail()).toBe(3);
  });

  test("toString is correct after pop", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.pop();
    expect(list.toString()).toBe("( 2 ) -> ( 3 ) -> null");
  });

  test("popping all elements empties the list", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.pop();
    list.pop();
    list.pop();
    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  test("returns undefined on an empty list", () => {
    const list = new LinkedList<number>();
    expect(list.pop()).toBeUndefined();
  });
});


describe("insertAt", () => {
  test("inserts multiple values at a middle index (spec example)", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.insertAt(1, 10, 11);
    expect(list.toString()).toBe("( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null");
    expect(list.size()).toBe(5);
  });

  test("inserts at head (index 0)", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.insertAt(0, 0);
    expect(list.toString()).toBe("( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null");
    expect(list.getHead()).toBe(0);
  });

  test("inserts at tail", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.insertAt(3, 4);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
    expect(list.getTail()).toBe(4);
  });

  test("inserts multiple values at head", () => {
    const list = new LinkedList<number>();
    list.append(3);
    list.insertAt(0, 1, 2);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> null");
  });

  test("inserts into an empty list at index 0", () => {
    const list = new LinkedList<number>();
    list.insertAt(0, 7);
    expect(list.toString()).toBe("( 7 ) -> null");
  });

  test("throws RangeError when index is out of bounds", () => {
    const list = new LinkedList<number>();
    list.append(1);
    expect(() => list.insertAt(5, 99)).toThrow(RangeError);
  });
});


describe("removeAt", () => {
  test("removes a node from the middle", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3).append(4).append(5);
    list.removeAt(2);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 4 ) -> ( 5 ) -> null");
    expect(list.size()).toBe(4);
  });

  test("removes the head node", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.removeAt(0);
    expect(list.toString()).toBe("( 2 ) -> ( 3 ) -> null");
    expect(list.getHead()).toBe(2);
  });

  test("removes the tail node", () => {
    const list = new LinkedList<number>();
    list.append(1).append(2).append(3);
    list.removeAt(2);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> null");
    expect(list.getTail()).toBe(2);
  });

  test("removes the only element", () => {
    const list = new LinkedList<number>();
    list.append(42);
    list.removeAt(0);
    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.toString()).toBe("");
  });

  test("throws RangeError when index is too large", () => {
    const list = new LinkedList<number>();
    list.append(1);
    expect(() => list.removeAt(5)).toThrow(RangeError);
  });

  test("throws RangeError when index is negative", () => {
    const list = new LinkedList<number>();
    list.append(1);
    expect(() => list.removeAt(-1)).toThrow(RangeError);
  });
});
