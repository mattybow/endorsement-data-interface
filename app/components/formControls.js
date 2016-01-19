import React, { PropTypes } from 'react';

const FormControls = (props) => {

  return <div>
    <div className="form-controls mobile-only flex-parent-row"
         style={{
           height:'3em',
           marginBottom:'1em'
         }}>
      <button className="no-border btn-naked flex-child-expand"
              style={{
                paddingLeft:9,
                verticalAlign:'middle',
                textAlign:'left'
              }}
              onClick={props.closeHandler}>
        <span className="icon-arrow back"></span>
        <span>cancel</span>
      </button>
      <button className="no-border btn-naked flex-child-expand"
              style={{
                textAlign:'right',
                paddingRight:20
              }}
              onClick={props.saveHandler}>
        <div>save</div>
      </button>
    </div>
    <div className="form-controls desktop-only" style={{position:'absolute', right:'-4em', top:0}}>
      <div className="icon-check-mark icon-lg pointer" style={{marginBottom:'.5em'}} onClick={props.saveHandler}></div>
      <div className="icon-close icon-lg pointer" onClick={props.closeHandler}></div>
    </div>
  </div>

}

FormControls.propTypes = {
  closeHandler:PropTypes.func.isRequired,
  saveHandler:PropTypes.func.isRequired
}

export default FormControls
