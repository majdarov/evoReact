import React from 'react';
import { apiIDB } from '../../../api/apiIDB';
import { Modal } from '../Modal/Modal';
import Tree from '../Tree/Tree';
import s from './GroupsTree.module.css';

const GroupsTree = props => {

    const groups = [...props.groups];
    let g = groups.find(item => item.id === props.parent_id);
    let gLabel = g ? g.label : 'Root';
    let onDivClick = props.disabled ? null : props.onClick;

    async function delGroup() {
        let confirmDel = window.confirm(`Вы действительно хотите удалить группу\n\r${gLabel}\n\rid: ${props.parent_id}?`)
        if (confirmDel) {
            let parentGroup = (await apiIDB.getGroup(props.parent_id)).parent_id;
            if (!parentGroup) parentGroup = '0';
            await props.deleteProduct(props.parent_id, parentGroup, 'group')
        } else {
            alert('DELETED CANCEL');
        }
    }

    return (
        <div className={s['tree-container']}>
            {props.treeView &&
                // <div className={s.tree} >
                <Modal>
                    <div className={s['tree-modal']}>
                        <Tree
                            data={groups}
                            price="Price"
                            treeLabel="Groups"
                            callback={props.callbackTree}
                            viewEdit={props.viewEdit}
                            pId={props.parent_id}
                        />
                    </div>
                </Modal>
                // </div>
            }
            {props.parent_id !== '0' &&
                <div onClick={() => props.getProductId(props.parent_id, true)} className={s.edit}>
                    <i className='fa fa-edit fa-1x'></i>
                </div>
            }
            <div className={s['g-tree']} onClick={onDivClick}>
                <div name='parent_id'>
                    {props.label || gLabel}
                    {/* <i className='fa fa-share-alt fa-1x'></i> */}
                    <i className='fa fa-bars fa-1x'></i>
                </div>
            </div >
            {props.isEmpty &&
                <div onClick={delGroup} className={s.del}>
                    <i className='fa fa-trash-alt'></i>
                </div>
            }
        </div>
    )
}

export default GroupsTree;
