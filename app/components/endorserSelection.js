import React, { Component } from 'react';
import AutoCompleteSelector from './autoCompleteSelector';
import Avatar from './avatar';
import { connect } from 'react-redux';
import { getEndorsersIfNeeded } from '../actions/endorserActions';
import { colors } from '../styles/inlineConstants';

const {grey} = colors;

function selectData(state,props){
  const { endorsers } = state;
  return { endorsers };
}

class EndorserSelection extends Component{
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded())
  }
  handleEndorserSelection(choice){
    console.log(choice);
  }
  enterHandler(){
    console.log('call endorser selection');
  }
  renderEndorsers(results){
    return results.map(result => <div>
      {result.value}
    </div>);
  }
  renderNoChoices(){
    return <div className="endorser-choice"
                style={{
                  padding:'0 1em'
                }}>
      <div style={{
          fontSize:'.8em',
          color:grey,
          margin:'1em 0'
        }}>no matches exist</div>

      <div>press <span className="key-block">enter</span>to create a new endorser</div>
    </div>;
  }
  renderChoice(choice){
    return <div className="flex-parent-row endorser-choice"
                style={{
                  padding:'0 1em'
                }}>
      <Avatar size={30}
              url={choice.avatar}/>
            <div className="flex-child-expand endorser-choice-name">
              {choice.value}
            </div>
    </div>;
  }
  render(){
    return <AutoCompleteSelector inputPlaceholder="Search for Endorser"
                                 renderResults={this.renderEndorsers}
                                 renderChoice={this.renderChoice}
                                 renderNoChoices={this.renderNoChoices}
                                 closeOnSelect={true}
                                 onEnter={this.enterHandler}
                                 selectionClickHandler={this.handleEndorserSelection}
                                 choices={this.props.endorsers.map(endorser => ({
                                   value:endorser.NAME,
                                   id:endorser.END_ID,
                                   avatar:endorser.AVATAR
                                 }))}/>;
  }
}

export default connect(selectData)(EndorserSelection)