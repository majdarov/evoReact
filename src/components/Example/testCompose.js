function compose(...fns) {
    return x => fns.reduceRight((acc, fn) => fn(acc), x);
}
const a = x => x + 2;
const b = x => x * 3;

export const withCompose = compose(b, a);

console.log(compose(b,a)(6)) //24

export function map(cb) {
    return arr => arr.map(cb);
}
const double = n => n * 2;

export const withDouble = map(double);

function prop(key) {
    return function(obj) {
        return obj[key];
    }
}

export const getName = prop('name');
