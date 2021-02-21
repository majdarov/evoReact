import React from 'react';
import Tree from '../Tree/Tree';
import s from './GroupsTree.module.css';

const GroupsTree = props => {

  const groups = [...props.groups];
  let g = groups.find(item => item.id === props.parent_id);
  let gLabel = g ? g.label : 'Root';
  let onDivClick = props.disabled ? null : props.onClick;

  return (
      <div className={s['tree-container']}>
          {props.treeView &&
              <div className={s.tree} >
                  <Tree data={groups} price="Price" treeLabel="Groups" callback={props.callbackTree} />
              </div>
          }
          <div className={s['g-tree']} onClick={onDivClick}>
              <div name='parent_id'>
                  {gLabel}
                  <i className='fa fa-share-alt fa-1x'></i>
              </div>
          </div >
      </div>
  )
}

export default GroupsTree;
