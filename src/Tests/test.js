const wrapper = (fn, args) => {
    let _this = this;
    if (/* typeof args[0] === 'string' */ fn === match) {
        _this = args[0];
        args = args.slice(1);
    }
    return fn.call(_this, ...args);
}

const match = String.prototype.match;
const equal = (a, b) => a === b;

let wrapMatch = wrapper(match, ['Tree', /tr/gi]);
let wrapEqual55 = wrapper(equal, [5, 5]);
let wrapEqual53 = wrapper(equal, [5, 3]);

console.log('match', wrapMatch);
console.log('equal55', wrapEqual55);
console.log('equal53', wrapEqual53);

const AND = 'AND';
const OR = 'OR';

const logic = {
    [['MATCH']]: String.prototype.match,
    [AND]: (a, b) => a && b,
    [OR]: (a, b) => a || b
}

console.log('true && false', logic[['AND']](true, false));
console.log('true && 1', logic[AND](1, 1));
console.log('true || !!0', logic[OR](1, !0));
console.log(logic[['MATCH']].call('Tree label', /lab/gi));

console.log(logic[['MATCH']] === match);
