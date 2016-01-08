import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import cx from 'classnames';

const FormCheckBox = (props) => {
  let checkboxClasses = cx('form-check-box',{
    checked:props.isChecked
  });
  return <Checkbox name="checkboxName2"
                    labelStyle={{fontFamily:'Source Code Pro'}}
                    iconStyle={{
                      fill: '#A06CD5'
                    }}
                    checked={props.isChecked}
                    label={props.label}
                    onCheck={props.checkHandler}
  />
}

export default FormCheckBox;
