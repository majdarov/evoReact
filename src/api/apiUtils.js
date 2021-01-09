export function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

export function map(cb) {
  return (arr) => arr.map(cb);
}
