import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextInputField = (props) => {
  const {id, label, changeHandler, value, type, placeholder} = props;
  return <div className="form-input">
    <label htmlFor={id+label}>{label}</label>
    <input type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onChange={changeHandler}
          id={id+label}/>
  </div>
}

export default TextInputField
