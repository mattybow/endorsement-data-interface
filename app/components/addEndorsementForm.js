import React, { Component } from 'react';
import '../styles/forms.scss';

export default class AddEndorsementForm extends Component{
  render(){
    return <div id="addEndorsementForm" className="form-container">
      <div className="icon-close" onClick={this.props.closeHandler}></div>
      <div className="quoted-tweet">Ricky Martin To Endorse Hillary Clinton Ahead Of Florida Event Aimed At Puerto Ricans</div>
      <div className="flex-parent-row">
        <div className="endorser-input">
          <h4>Endorser</h4>
          <div>
            <label htmlFor="endorser-first-name">first name</label>
            <input type="text" id="endorser-first-name"/>
          </div>
          <div>
            <label htmlFor="endorser-last-name">last name</label>
            <input type="text" id="endorser-last-name"/>
          </div>
          <div>
            <label htmlFor="endorsers-candidate">candidate</label>
            <input type="text" id="endorsers-candidate"/>
          </div>
        </div>
      </div>
    </div>;
  }
}
