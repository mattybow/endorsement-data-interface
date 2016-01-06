import React from 'react';
import cx from 'classnames';

const FormCheckBox = (props) => {
  let checkboxClasses = cx('form-check-box',{
    checked:props.isChecked
  });
  return <div className={checkboxClasses} onClick={props.checkHandler}>
    <div className="flex-parent-row">
      <div className="check-box-label">{props.label}</div>
      <div className="check-box">
        <div className="icon-check-mark"></div>
      </div>
    </div>
  </div>
}

export default FormCheckBox;
