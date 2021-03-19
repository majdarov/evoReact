import React, { useCallback, useEffect } from 'react';
import s from './Form.module.css';
import { useState } from "react";
import Preloader from '../../common/Preloader/Preloader';
import { ComponentsProducts } from './schemas/ComponentsProducts.jsx';
import { setNewCode, newBarcode, validateBarcode, validateZeroData, validateRequiredData, dateToLocaleString } from './frmUtilites';
import FormImg from './FormImg';
import FormModalWrapper from '../../common/Modal/FormModalWrapper';
import { useModifications } from './schemas/useModifications';
import { BlockMod } from '../../common/BlockMod';

const FormProduct = props => {

  const [isNewData, setIsNewData] = useState(!props.formData.id);
  const fileInput = React.createRef();
  const [isGroup, setIsGroup] = useState(props.isGroup);
  const [state, setState] = useState({
    ...props.formData,
    allow_edit: isNewData,
    parent_id: isNewData ? props.pid : props.formData.parent_id || 0, //parentId,
    photos: (props.formData.photos?.length && [...props.formData.photos]) || [],
    barcodes: (props.formData.barcodes?.length && [...props.formData.barcodes]) || [],
    bigImg: null,
    currentBarcode: '',
    created_at: props.formData.created_at ? new Date(props.formData.created_at) : new Date(),
    updated_at: props.formData.updated_at ? new Date(props.formData.updated_at) : new Date(),
  });
  const [treeView, setTreeView] = useState(false);
  const [mod, setMod] = useState(false);
  const [attributes, setAttributes] = useState((!!props.formData.attributes && [...props.formData.attributes]) || []);
  const [attrChoices, setAttrChoices] =
    useState((!!props.formData.attributes_choices && { ...props.formData.attributes_choices }) || []);
  const disabled = !isNewData && !state.allow_edit;
  const setViewForm = props.setViewForm;
  const setFormData = props.setFormData;

  const cancelClick = useCallback((ev) => {
    setViewForm(false);
    setFormData(null);
    document.body.style.overflow = 'auto';
  }, [setFormData, setViewForm])

  useEffect(() => {
    if (!state.code) {
      setNewCode().then(code => setState({ ...state, code }))
    }

    if (props.formError) {
      let err = props.formError;
      alert(err.message);
      props.setFormError(null);
    }
  }, [props, state])

  const { attributesP, getAttributes } = useModifications(state.parent_id);

  useEffect(() => {
    getAttributes({ parentId: state.parent_id })
  }, [getAttributes, state.parent_id])

  useEffect(() => { //cleare URL objects Photo
    return () => {
      if (state.photos?.length) {
        state.photos.forEach(item => URL.revokeObjectURL(item))
      }
    }
  })

  useEffect(() => { // EventListener('keyup')
    const handler = (ev) => {
      if (ev.key === 'Escape') {
        cancelClick();
      }
    }
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [cancelClick])

  const toggleGroup = () => {
    if (!isNewData) return;
    setIsGroup(!isGroup);
  }
  const formChanged = () => {
    let changes = [];
    for (let key in props.formData) {
      if (key === 'photos' || key === 'barcodes') {

        if (state[key].length !== props.formData[key].length)
          changes.push({ [key]: state[key] });
      } else {
        if (state[key] !== props.formData[key]) {
          changes.push({ [key]: state[key] });
        }
      }
    }
    if (state.parent_id && !props.formData.parent_id) {
      changes.push({ parent_id: state.parent_id })
    }
    // console.log(changes)
    if (changes.length === 1 && isNewData && changes[0].code) changes = [];
    return changes.length;
  }
  const formatPrice = price => {
    return isFinite(price) ? Number(price).toFixed(2) : '0.00';
  }

  const handleChange = (ev) => {

    let elem = ev.target;
    let name = elem.name;
    let value = elem.value;
    elem.classList.remove(s.required);

    if (name === 'barcodes') {
      if (state.barcodes.includes(value)) {
        alert(`Barcode ${value} is exist in this product!`);
        return;
      }
      setState({ ...state, currentBarcode: value });
      return;
    } else if (name === 'picture') {
      let photos = state.photos;
      Array.from(fileInput.current.files).forEach(item => {
        photos.push(item);
      })
      setState({ ...state, photos });
      return;
    } else if (name === 'allow_edit') {
      let form = document.getElementById(s['form-product']);
      Object.values(form.elements).forEach(item => {
        if (item.disabled && item.id !== s.uuid) item.removeAttribute('disabled');
      })
      setState({ ...state, allow_edit: true });
      form.allow_edit.parentNode.remove();
    } else if (name === 'allow_to_sell') {
      value = elem.checked;
      // console.log(name + ': ' + value)
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  }

  const clickChoice = (ev) => {
    if (ev.target.tagName !== 'SPAN') return;
    let elem = ev.target;
    let attrId = elem.parentNode.id;
    elem.parentNode.querySelectorAll('span').forEach(el => {
      el.classList.remove(s['selected']);
    });
    if (!attrChoices[attrId]) {
      setAttrChoices({ ...attrChoices, [attrId]: elem.id })
      elem.classList.add(s['selected']);
    } else {
      delete attrChoices[attrId];
      setAttrChoices({ ...attrChoices });
    }
    // console.log('attrId', attrId, elem.id)
  }

  const handleBlur = ev => {
    let name = ev.target.name || ev.currentTarget.name;
    let value = ev.target.value || ev.currentTarget.value;

    if (name === 'barcodes') {
      let newValue;
      if (!value) {
        let prefix = window.prompt(`Введите префикс!\r\n
          Рекомендуется последние 4 цифры ИНН.\r\n
          По умолчанию -> '0000'`, '7321');
        // if (!prefix || !isFinite(prefix)) prefix = '0000';
        newValue = newBarcode(state.code, prefix);
        if (state.barcodes.includes(newValue)) {
          console.warn(`Barcode ${newValue} is Exist!`)
          return;
        }

      }
      let valBc = validateBarcode(value || newValue);
      if (valBc !== 0) {
        window.alert(valBc);
        return;
      }
      let barcodes = [...state.barcodes, state.currentBarcode || newValue];
      setState({ ...state, barcodes });
      ev.target.value = '';
      return;
    }

    if (name === 'price' || name === 'cost_price') {
      value = isFinite(value) ? Number(value) : 0;
    }
    setState({ ...state, [name]: value });
    ev.target.value = formatPrice(value);
  }
  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (state.allow_edit && formChanged() && window.confirm('Save changes')) {
      // if (state.photos.length) setFormPhotos([...state.photos]);
      let body;
      if (isGroup) {
        body = {
          id: state.id,
          parent_id: state.parent_id,
          name: state.name,
          attributes: (!!attributes.length && attributes) || null,
          barcodes: state.barcodes,
          isNewData
        }
      } else {
        body = {
          ...state,
          attributes_choices: (attrChoices && !!Object.keys(attrChoices).length && attrChoices) || null,
        };
        delete body.createdAt;
        delete body.updatedAt;
        delete body.allow_edit;
        delete body.bigImg;
        delete body.currentBarcode;
        delete body.treeView;
        delete body.alcocodes;
      }

      if (body.parent_id === '0' || body.parent_id === 0) {
        delete body.parent_id;
      }

      let missData = validateRequiredData(body, isGroup);
      if (missData.length) {
        let strMessage = '';
        missData.forEach(item => {
          strMessage += ` ${item},`;
          document.getElementsByName(item).forEach(elem => {
            elem.classList.add(s.required);
          })
        });
        strMessage.slice(-1);
        alert(`Отсутствуют необходимые данные:\n\r${strMessage}!`);
        return;
      }

      validateZeroData(body/* , props.formData */);
      if (!isNewData) body.id = state.id;

      // alert(JSON.stringify(body, null, 2));

      let i = 0;
      Object.keys(body).forEach(item => i++);
      if (i <= 1 && !body.name) {
        alert('Данные не изменились!');
        return;
      }
      let typeQuery = !isNewData ? 'put' : 'post';
      let path = isGroup ? 'group' : 'product';
      props.postFormData(path, typeQuery, body);
      props.toggleFormPost(true);
    } else {
      props.setFormData(null);
      props.setViewForm(false);
    }
    document.body.style.overflow = 'auto';
  }
  const pictureClick = ev => {
    let p = ev.target;
    if (p.tagName === 'SPAN') {
      if (!state.allow_edit) return;
      let prevElem = p.previousElementSibling;
      deleteFromArray(prevElem.id, 'photos');
      return;
    }
    p.addEventListener('blur', () => {
      setState({ ...state, bigImg: null })
      p.removeEventListener('blur', this);
    })
    setState({ ...state, bigImg: p.src })
  }
  const onPicInputClick = ev => {
    ev.preventDefault();
    let picInput = document.getElementById('picInput');
    picInput.click();
  }
  const deleteFromArray = (elemId, arrName) => {
    let i = state[arrName].findIndex(item => item === elemId);
    let arr = state[arrName];
    arr.splice(i, 1);
    setState({ ...state, [arrName]: arr });
  }

  const callbackTree = (id, tagName) => {
    let parent_id = id ? id : 0;
    if (tagName !== 'SPAN') return;
    setState({ ...state, parent_id });
    setTreeView(false);
  }

  const clickGroups = () => {
    setTreeView(!treeView);
  }

  const copyProduct = () => {
    setIsNewData(true);
    setState({ ...state, id: null, barcodes: [], allow_edit: true });
    let formData = { ...state };
    delete formData.code;
    delete formData.allow_edit;
    delete formData.bigImg;
    delete formData.currentBarcode;
    delete formData.created_at;
    delete formData.updated_at;
    props.setFormData(formData);
  }

  const gProps = {
    groups: props.groups, disabled, parent_id: state.parent_id,
    onClick: clickGroups, treeView, callbackTree
  };

  const mnProps = { disabled, handleChange, id: s.measure_name, measure_name: state.measure_name };
  const tProps = { disabled, handleChange, id: s.type, type: state.type };
  const taxProps = { disabled, handleChange, id: s.tax, tax: state.tax };

  const bProps = {
    barcodes: state.barcodes, bc: state.currentBarcode,
    handleChange, handleBlur, deleteFromArray,
    allow_edit: state.allow_edit, disabled,
  };

  const pProps = { id: s.picture, className: s['picture-small'], divPicture: s['div-picture'], pictureClick };

  if (props.formPost) {
    return <Preloader />
  } else {
    return (
      <>
        {state.bigImg &&
          <FormModalWrapper
            form={<FormImg photo={state.bigImg} />}
          />}
        <form id={s['form-product']} onSubmit={handleSubmit} >
          <div className={s['menu-buttons']}>
            <i className='fa fa-clone' id={s.copy} onClick={copyProduct}></i>
            <span className={s['menu-buttons-groups']} onClick={toggleGroup}>{isGroup ? 'Group' : 'Product'}</span>
            <i className='fa fa-times' id={s.close} onClick={handleSubmit}></i>
            {/* fa-sign-out-alt */}
          </div>
          <fieldset className={s['product-info']}>
            <legend>{isGroup ? 'Group' : 'Product'} Info</legend>
            <div className={s['id-barcodes-photos']}>
              <div className={s['allow-to-sell']}>
                <label htmlFor='allow_to_sell'>Allow to sell:</label>
                <input type="checkbox" name="allow_to_sell" id="allow_to_sell"
                  defaultChecked={state.allow_to_sell} disabled={disabled}
                  onChange={handleChange} />
              </div>
              <div className={s['uuid']}>
                <label htmlFor='uuid'>ID:</label>
                <input name='uuid' value={state.id || ''} disabled={!isNewData} onChange={handleChange} />
              </div>
              {
                !isNewData &&
                <div className={s['allow-edit']}>
                  <label htmlFor='allow-edit'>Allow Edit:</label>
                  <input type='checkbox' id={s['allow-edit']} name='allow_edit'
                    checked={state.allow_edit}
                    onChange={handleChange} />
                </div>
              }
            </div>
            {
              !!state.photos?.length &&
              <div className={s['form-photo']}>
                {state.photos.map(ph => {
                  return <ComponentsProducts.Picture {...pProps} photo={ph} key={ph.name} />
                })}
              </div>
            }
            {
              state.photo || !state.allow_edit ? null :
                <>
                  <input type="file" name="picture" id='picInput' multiple={true}
                    onChange={handleChange} ref={fileInput} style={{ display: 'none' }} />
                  <label htmlFor="picture" onClick={onPicInputClick}>Input Image</label>
                </>
            }
            <ComponentsProducts.Barcodes {...bProps} />
            {!isGroup &&
              <div className={s.code_article}>
                <div className={s.code}>
                  <label htmlFor='code'>Code:</label>
                  <input type="text" name="code" value={state.code || ''} onChange={handleChange} disabled={disabled} />
                </div>
                <div className={s['article-number']}>
                  <label htmlFor='article_number'>Aticle:</label>
                  <input type="text" name='article_number' value={state.article_number || ''}
                    onChange={handleChange} disabled={disabled} />
                </div>
              </div>
            }
            {!isGroup &&
              <div className={s.propertyes}>
                <ComponentsProducts.MeasureNames {...mnProps} />
                <ComponentsProducts.Types {...tProps} />
                <ComponentsProducts.Taxes {...taxProps} />
              </div>
            }
            <ComponentsProducts.GroupsTree {...gProps} />
            <div className={s.name}>
              <label htmlFor='name'>Name:</label>
              <input name="name" value={state.name} placeholder='Input name ...'
                onChange={handleChange} disabled={disabled} />
            </div>
            {isGroup && !attributes.length &&
              <div className={s['add-mod']}>
                <label htmlFor="add_mod">Модификация</label>
                <input type="checkbox" name="add_mod" onChange={() => setMod(!mod)} />
              </div>
            }
            {(mod || !!attributes.length) &&
              <BlockMod attributes={attributes} setAttributes={setAttributes} disabled={disabled} />
            }
            {
              !!attributesP?.length && !isGroup &&
              <ComponentsProducts.Attributes
                attributes={attributesP}
                clickChoice={clickChoice}
                disabled={disabled}
                attributes_choices={attrChoices}
              />
            }
            {!isGroup &&
              <div className={s.description}>
                <label>Description:</label>
                <input type="text" name="description"
                  value={state.description || ''}
                  onChange={handleChange} disabled={disabled}
                />
              </div>}
            {!isGroup &&
              <div>
                <div className={s.prices}>
                  <div className={s.price}>
                    <label htmlFor='price'>Price:</label>
                    <input name="price" defaultValue={formatPrice(state.price)}
                      onBlur={handleBlur} onChange={handleChange} disabled={disabled} />
                    <i className='fa fa-ruble-sign'></i>
                  </div>
                  <div className={s.price}>
                    <label htmlFor='cost_price'>Cost Price:</label>
                    <input name="cost_price" defaultValue={formatPrice(state.cost_price)}
                      onBlur={handleBlur} disabled={disabled} />
                    <i className='fa fa-ruble-sign'></i>
                  </div>

                </div>
              </div>
            }
            <div className={s['product-dates']}>
              <div className={s.created_at}>
                <h4>Создан:</h4>
                <span>{dateToLocaleString(state.created_at)}</span>
              </div>
              <div className={s.updated_at}>
                <h4>Обновлен:</h4>
                <span>{dateToLocaleString(state.updated_at)}</span>
              </div>
            </div>
          </fieldset>
          <div className={s.buttons}>
            <div className={s['button-submit']} onClick={handleSubmit}>
              <input type="submit" value="Ready" />
              <span>Submit</span>
            </div>
            <div className={s['button-cancel']}>
              <span id={s.cancel} onClick={cancelClick}>Cancel</span>
            </div>
          </div>
        </form>
      </>
    );
  }
}
export default FormProduct;
