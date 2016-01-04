import React from 'react';

const FormInputText = (props) => {
  const {
    inputName,
    label,
    data
  } = props;
  return <div className="form-input-text">
    <label htmlFor={inputName}>{label}</label>
    <input type="text" id={inputName}/>
  </div>
}

export default FormInputText;
