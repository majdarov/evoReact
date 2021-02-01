import React, { useEffect, useState } from 'react';

const ProgressBar = (props) => {
  const [p, setP] = useState('_');

  useEffect(() => {
    let limit = props.limit;
    let c = 0;
    let timer = setInterval(() => {
      c++;
      if (c > limit) {
        c = 0;
        setP('_');
      }
      setP((p) => (p += '_'));
    }, props.delay);
    return () => clearInterval(timer);
  }, [props.delay, props.limit]);

  const styleSpan = {
    backgroundColor: 'blue',
    color: 'blue',
  };

  return (
    <div>
      <h5 style={{display: 'inline'}}>{props.text}</h5><span style={styleSpan}>{p}</span>
    </div>
  );
};

export default ProgressBar;
