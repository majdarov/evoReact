import { React } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable } from './utilsTable';

export default function Table(props) {
  const { products } = props;
  const { items, requestSort, sortConfig } = useSortableData(products);

  if (!items.length) return <p>Empty Group!</p>

  const schema = props.schema || Object.keys(products[0]);
  const headers = props.schema.map(item => {
    return item[1];
  });

  const getClassName = name => {
    if (!sortConfig) return;
    let className = sortConfig.key === name ? sortConfig.direction : null;
    switch (className) {
      case 'asc':
        return 'fa fa-sort-amount-up-alt';
      case 'desc':
        return 'fa fa-sort-amount-down';
      default:
        break;
    }
  }

  return (
    <div onClick={ev => clickTable(ev, props.callback, props.deleteProduct)}>
      {/* <caption>Commodities</caption> */}
      <table>
        <thead>
          <tr>
            {
              headers.map((item, idx) => {
                if (item === 'uuid' || item === 'id') return null;
                return <th
                  key={item}
                  onClick={() => requestSort(schema[idx][0])}
                >{item}<i className={getClassName(schema[idx][0])}></i></th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {items.map(product => (
            <tr key={product.uuid || product.id} id={product.uuid || product.id}>
              { schema.map(item => {
                if (item[0] === 'uuid' || item[0] === 'id') return null;
                return <td key={`${item[0]}_${product.id || product.uuid}`} name={item[0]}>{product[item[0]]}</td>
              })}
              <td key={`del_${product.id || product.uuid}`}><span className={s.del}></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
