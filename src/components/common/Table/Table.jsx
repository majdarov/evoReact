import { React } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable } from './utilsTable';

export default function Table(props) {
  const { products } = props;
  const schema = props.schema || Object.keys(products[0]);
  const headers = props.headers || [...schema];
  const { items, requestSort, sortConfig } = useSortableData(products);

  const getClassName = name => {
    if (!sortConfig) return;
    let className = sortConfig.key === name ? sortConfig.direction : null;
    switch (className) {
      case 'asc':
        return s.asc;
      case 'desc':
        return s.desc;
      default:
        break;
    }
  }

  return (
    <table onClick={ev => clickTable(ev, props.callback)}>
      {/* <caption>Commodities</caption> */}
      <thead>
        <tr>
          {
            headers.map(item => {
              if (item === 'uuid' || item === 'id') return null;
              return <th
                key={item}
                onClick={() => requestSort(item)}
              >{item}<i className={getClassName(item)}></i></th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {items.map(product => (
          <tr key={product.uuid || product.id} id={product.uuid || product.id}>
           { schema.map(item => {
             if (item === 'uuid' || item === 'id') return null;
             return <td key={`${item}_${product.id || product.uuid}`} name={item}>{product[item]}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
