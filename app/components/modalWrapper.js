import React, { Component } from 'react'

export default class ModalWrapper extends Component{
  componentDidUpdate(){
    document.body.style.overflow = this.props.isOpen ? 'hidden' : '';
  }
  render(){
    const { isOpen } = this.props;
    return <div style={{
        position:'fixed',
        top:0,
        left:0,
        right:0,
        backgroundColor:'rgba(255,255,255,.95)',
        padding:'5% 20%',
        minHeight:'100%',
        visibility: isOpen ? 'visible' : 'hidden',
        transition: isOpen ? 'none' : 'visibility 140ms'
      }} className="modal-wrapper">
      <div className="modal-content-container" style={{
          maxWidth:600,
          margin:'auto',
          transition: 'transform .2s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}>
        {this.props.children}
      </div>
    </div>;
  }
}
