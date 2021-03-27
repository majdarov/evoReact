function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input;
  }
  return padding + input;
}

console.log(padLeft(5, 'test'));
console.log(padLeft('NEW-', 'test'));

function firstElement<T>(arr: Array<T>): unknown {
  if (typeof arr[0] === 'number') {
    return arr[0];
  } else if (typeof (arr[0] as unknown) === 'string') {
    return ((arr[0] as unknown) as string).toUpperCase();
  } else {
    return arr[0];
  }
}

let arr = ['hello', 25, 30];

console.log(firstElement(arr));

interface GenericIndentityFn<Type> {
  (arg: Type): Type;
}
function indentity<Type>(arg: Type): Type {
  return arg;
}
let myIndentity: GenericIndentityFn<number> = indentity;
myIndentity(5);

let myNewIndentity: GenericIndentityFn<any[]> = () => [];
myNewIndentity([]);

interface LengthWise {
  length: number;
}

function getLength<T extends LengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
getLength('');
getLength([]);
getLength({ length: 5, value: 5 });
// getLength(5); //error

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const obj = {a: 1, b: 2};
getProperty(obj, 'a');
// getProperty(obj, 'm') //error

class BeeKeeper {
  hasMask: boolean;
}
class ZooKeeper {
  nameTag: string;
}
class Animal {
  numLegs: number;
}
class Bee extends Animal {
  keeper: BeeKeeper;
}
class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A):A {
  return new c();
}

let lion = createInstance(Lion);
// lion.keeper.nameTag = 'Lion';
lion.numLegs = 4;
console.log(lion);
