function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input;
  }
  return padding + input;
}

console.log(padLeft(5, 'test'));
console.log(padLeft('NEW-', 'test'));

function firstElement<T>(arr: T[]) {
  return arr[0];
}

let arr = [10, 25, 30];;

console.log(firstElement(arr));

interface Box<Type> {
  content: Type;
}

function boxToUpperCase<Type>(box: Box<Type>) {
  if (typeof box.content === 'string') return box.content.toUpperCase;
  return box.content;
}
