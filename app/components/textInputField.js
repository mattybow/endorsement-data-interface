import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextInputField = (props) => {
  const {id, label, changeHandler, value, type, placeholder} = props;
  return <TextField  value={value}
              floatingLabelText={label}
              underlineFocusStyle={{borderColor: '#A06CD5'}}
              floatingLabelStyle={{color: 'black'}}
              fullWidth={true}
              type={type || 'text'}
              hintText={placeholder || ''}
              style={{fontFamily:'Source Code Pro'}}
              onChange={ changeHandler }/>
}

export default TextInputField
