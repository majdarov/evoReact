import React, { useEffect, useState } from 'react';

let ProgressBar2 = (props) => {
  const [p, setP] = useState('');

  useEffect(() => {
    let limit = props.limit;
    let c = 0;
    let timer = setInterval(() => {
      c++;
      if (c > limit) {
        c = 0;
        setP('');
      }
      setP((p) => (p += c));
    }, props.delay);
    return () => clearInterval(timer);
  }, [props.delay, props.limit]);

  const styleSpan = {
    backgroundColor: 'blue',
    color: 'blue',
  };

  const styleDiv = {
    width: props.limit + 3 + 'ch',
    border: 'solid 1px blue',
    padding: '2px'
  };

  return (
    <div className={'progressBar'}>
      <h4 style={{ display: 'inline' }}>{props.text}</h4>
      <div style={styleDiv}>
        <span style={styleSpan}>{p}</span>
      </div>
    </div>
  );
};

export default ProgressBar2;
