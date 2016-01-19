import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextInputField = (props) => {
  const {END_ID, label, changeHandler, value, type, placeholder} = props;
  return <div className="form-input">
    <label htmlFor={END_ID+label}>{label}</label>
    <input type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onChange={changeHandler}
          id={END_ID+label}/>
  </div>
}

export default TextInputField
