import React, { useEffect } from 'react';
/* import { withCompose, withDouble, map, getName } from './testCompose';

console.log(withCompose(5)); //21

const arr = [1, 2, 3, 4, 5];
console.log(withDouble(arr)); // [ 2, 4, 6, 8, 10 ]

const people = [
    { name: "Alex" },
    { name: "Julia" },
    { name: "Leo" },
    { name: "Den" }
  ];

console.log(map(getName)(people)); */

const Example = ({ count }) => {

    useEffect(() => {
        console.log('render - ' + count)
        return () => {
            console.log('unmount - ' + count);
        }
    }, [count])

    return (
        <div>example: {count}</div>
    );
}

export default Example;
