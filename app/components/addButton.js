import React, { Component } from 'react'

export default class AddButton extends Component{
  render(){
    return <div style={{marginTop:'1em', textAlign:'right'}}>
      <button className="btn-default flex-parent-row"
              style={{ padding:'1em', display:'inline-block'}}
              onClick={this.props.clickHandler}>
        <span className="flex-child-expand">{this.props.buttonText}</span>
      </button>
    </div>;
  }
}
