import React, { useState } from 'react';
import schema from './products.json';
import { viewBarcode } from '../frmUtilites';
import Tree from '../../../common/Tree/Tree';
import s from '../Form.module.css';

export const ComponentsProducts = {
    MeasureNames: props => {
        return (
            <label>
                Measure Name
                <select name="measure_name"
                    id={props.id}
                    value={props.measure_name}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.measure_names.map((m, i) => {
                            return <option key={i} value={m}>{m}</option>
                        })
                    }
                </select>
            </label>
        )
    },
    Types: props => {
        return (
            <label>
                Type
                <select name="type"
                    id={props.id}
                    value={props.type}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.types.map((t, i) => {
                            return <option key={i} value={t.type}>{t.description}</option>
                        })
                    }
                </select>
            </label>
        )
    },
    Taxes: props => {
        return (
            <label className={s.tax}>
                Tax
                <select name="tax"
                    id={props.id}
                    value={props.tax}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.taxes.map((t, i) => {
                            return <option key={i} value={t.tax}>{t.description}</option>
                        })
                    }
                </select>
            </label>
        )
    },
    Groups: props => {
        let groups = props.groups.sort((a, b) => {
            if (a.label > b.label) return 1;
            if (a.label < b.label) return -1;
            return 0;
        })
        return (
            <label>
                Group:
                <select name="parent_id" id={props.id}
                    value={props.parent_id} onChange={props.handleChange} disabled={props.disabled}>
                    <option key='0' value='0'>Root</option>
                    {groups.map(g => {
                        return <option key={g.id} value={g.id}>{g.label}</option>
                    })}
                </select>
            </label>
        )
    },
    GroupsTree: props => {
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
                        <i className='fa fa-share-alt'></i>
                    </div>
                </div >
                <div className={s.space}></div>
            </div>
        )
    },

    classDiv: s['g-tree'], classTree: s.tree,
    Barcodes: props => {

        const [view, setView] = useState(false);

        let barcodes = [];
        if (props.barcodes?.length) {
            barcodes = [...props.barcodes];
        }

        const delBcClick = ev => {
            if (!props.allow_edit) return;
            let elem;
            if (ev.target.tagName === 'SPAN') {
                elem = ev.target.closest('li');
            }
            if (!elem) return;
            props.deleteFromArray(elem.id, 'barcodes');
        }

        const toggleViewBarcodes = () => {
            setView(view => !view);
        }

        return (
            <fieldset name='img_barcodes'>
                <legend onClick={toggleViewBarcodes} style={{ cursor: 'pointer' }}>Barcodes</legend>
                <div className={view ? s['barcodes'] : `${s['barcodes']} ${s['barcodes-hidden']}`}>
                    <div className={s['view-barcode']}>
                        <ul>
                            {barcodes.map(b => {
                                return (
                                    <li key={b} id={b} onClick={delBcClick}>{viewBarcode(b)}
                                        <span className={s['del-bc']}></span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <input name='barcodes' type="text" defaultValue={props.bc}
                        onChange={props.handleChange} onBlur={props.handleBlur}
                        disabled={props.disabled} />
                    <span className={s['add-bc']}></span>
                </div>
            </fieldset >
        )
    },
    Picture: props => {
        return (
            <div className={props.divPicture} onClick={props.pictureClick}>
                <img id={props.photo.name} className={props.className}
                    src={URL.createObjectURL(props.photo)}
                    alt="no" tabIndex='-1'
                />
                <span></span>
            </div>
        )
    }
}
