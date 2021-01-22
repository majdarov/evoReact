import React, { useEffect, useState } from 'react';

let ProgressBar = (props) => {
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

  return (
    <div>
      <h5>
        {props.text}
        {p}
      </h5>
    </div>
  );
};

export default ProgressBar;
