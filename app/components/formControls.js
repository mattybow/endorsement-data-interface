import React from 'react';

const FormControls = (props) => {
  return <div className="form-controls" style={{position:'absolute', right:'-4em', top:0}}>
    <div className="icon-check-mark icon-lg" style={{marginBottom:'.5em'}}></div>
    <div className="icon-close icon-lg" onClick={props.closeHandler}></div>
  </div>
}

export default FormControls
