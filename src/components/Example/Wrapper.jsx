import React, { useState } from 'react';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import Example from './Example';

const Wrapper = (props) => {

    const [count, setCount] = useState(0);
    const clickButton = () => {
        setCount(count + 1);
        if (count > 5) setCount(0);
    };

    return (
        <>
            <button onClick={clickButton}>{count}</button>
            {count < 5 && <Example count={count} />}
            {count < 5 && <Example count={-1} />}
            { (count < 3) && <ProgressBar limit={10} text='test' delay={500} /> }
        </>
    );
}

export default Wrapper;
