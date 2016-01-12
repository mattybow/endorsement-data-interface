import React, { Component } from 'react';
import cx from 'classnames';
import AutoCompleteDropdown from './autoCompleteDropdown';
import "../styles/autoComplete.scss";

export default class TagInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:''
    }
  }
  handleTagInputChange(term){
    this.setState({searchTerm:term});
  }
  handleCloseClick(){
    this.setState({searchTerm:''});
  }
  render(){
    const {searchTerm} = this.state;
    const closeIconClasses = cx("btn-naked", "no-border", "icon-close", "fader", {faded: !searchTerm});
    const autoCompleteClasses = cx("auto-complete-container", {open: !!searchTerm})
    return <div style={{position:'relative'}}>
      <div className="search-input-holder" style={{position:'relative'}}>
        <button className={closeIconClasses}
             style={{
                      position:'absolute',
                      right:0,
                      top:'0.8em'
                    }}
             onClick = {()=> {this.handleCloseClick()}}>
        </button>
        <input type="text"
               style={{paddingRight:'1em'}}
               placeholder="Search for tag"
               value={searchTerm}
               onChange={ev => {
                 this.handleTagInputChange(ev.target.value);
               }}/>
         <div className={autoCompleteClasses}
              style={{position:'absolute',
                 top:'3em',
                 left:0,
                 width:'100%'
               }}>
           <AutoCompleteDropdown choices={[{value:"asdf"}, {value:"1324"}]}/>
         </div>

      </div>
    </div>;
  }
}
