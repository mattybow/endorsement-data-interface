import React, { Component } from 'react'

export default class AutoCompleteDropdown extends Component{
  renderChoices(){
    return this.props.choices.map(choice => <div className="dropdown-choice" style={{
      padding:'0 1em'
    }}>
      <div>{choice.value}</div>
    </div>);
  }
  render(){
    return <div className="dropdown-container">
        {this.renderChoices()}
    </div>;
  }
}
