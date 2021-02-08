import { React } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable } from './utilsTable';

export default function Table(props) {
  const { products } = props;
  const { items, requestSort, sortConfig } = useSortableData(products);

  if (!items.length) return <p>Empty Group!</p>

  const schema = props.schema || Object.keys(products[0]);
  const headers = props.headers || [...schema];

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
                  onClick={() => requestSort(schema[idx + 1])}
                >{item}<i className={getClassName(schema[idx + 1])}></i></th>
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
              <td key={`del_${product.id || product.uuid}`}><span className={s.del}></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
