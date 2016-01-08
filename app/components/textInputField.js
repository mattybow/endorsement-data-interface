import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextInputField = (props) => {
  const {id, label, changeHandler, dataKey} = props;
  return <TextField  value={props[dataKey]}
              floatingLabelText={label}
              underlineFocusStyle={{borderColor: '#A06CD5'}}
              floatingLabelStyle={{color: '#A06CD5'}}
              fullWidth={true}
              style={{fontFamily:'Source Code Pro'}}
              onChange={ ev => {
                changeHandler(id, {[dataKey]:ev.target.value});
              }}/>
}

export default TextInputField
