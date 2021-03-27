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
  } else if( typeof (arr[0] as unknown) === 'string') {
    return ((arr[0] as unknown) as string).toUpperCase();
  } else {
    return arr[0];
  }
}

let arr = ['hello', 25, 30];

console.log(firstElement(arr));
