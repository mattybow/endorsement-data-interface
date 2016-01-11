import React, { PropTypes } from 'react';

const FormControls = (props) => {
  return <div className="form-controls" style={{position:'absolute', right:'-4em', top:0}}>
    <div className="icon-check-mark icon-lg pointer" style={{marginBottom:'.5em'}} onClick={props.saveHandler}></div>
    <div className="icon-close icon-lg pointer" onClick={props.closeHandler}></div>
  </div>
}

FormControls.propTypes = {
  closeHandler:PropTypes.func.isRequired,
  saveHandler:PropTypes.func.isRequired
}

export default FormControls
