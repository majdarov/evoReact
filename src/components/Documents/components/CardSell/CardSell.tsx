import React from 'react';
import s from './CardSell.module.css';

export function CardSell(props: any) {
  return (
    <div className={s['card-container']}>
      <div className={s['card-header']}>
        <h3>{props.type}: {props.number}</h3>
      </div>
      <div className={s['card-body']}>
        <ul>
          {props.body?.positions && props.body.positions.map((p: any) => {
            return (
              <li key={p.uuid} id={p.uuid}>
                <span>{p.product_name}</span> |
                <span>{p.price}</span> |
                <span>{p.quantity}</span> |
                <span>{p.sum}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={s['card-footer']}>
        Sum: {props.body?.result_sum}
      </div>
    </div>
  )
}
