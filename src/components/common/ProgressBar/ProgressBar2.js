import React, { useEffect, useState } from 'react';

const ProgressBar2 = ({limit = 10, delay = 500, text = 'Processing...'}) => {
  const [p, setP] = useState('');

  useEffect(() => {
    let c = 0;
    let timer = setInterval(() => {
      c++;
      if (c > limit) {
        c = 0;
        setP('');
      }
      setP((p) => (p += c));
    }, delay);
    return () => clearInterval(timer);
  }, [delay, limit]);

  const styleSpan = {
    backgroundColor: 'blue',
    color: 'white',
  };

  const styleDiv = {
    width: limit + 3 + 'ch',
    border: 'solid 1px blue',
    padding: '2px'
  };

  return (
    <div className={'progressBar'}>
      <h4 style={{ display: 'inline' }}>{text}</h4>
      <div style={styleDiv}>
        <span style={styleSpan}>{p}</span>
      </div>
    </div>
  );
};

export default ProgressBar2;
