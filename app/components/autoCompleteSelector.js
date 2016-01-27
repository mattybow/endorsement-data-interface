import React, { Component } from 'react';
import cx from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';

const ENTER_KEY = 13;
const DOWN_KEY = 40;
const UP_KEY = 38;
const ESC_KEY = 27;

class AutoCompleteDropdown extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  componentDidMount(){
    document.body.addEventListener('keydown', this.closeOnEsc, false);
  }
  componentWillUnmount(){
    document.body.removeEventListener('keydown', this.closeOnEsc, false);
  }
  closeOnEsc = (ev) => {
    if(ev.which === ESC_KEY){
      this.props.closeClickHandler();
      ev.target.blur();
    }
  }
  callClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.closeClickHandler();
  }
  filterChoices(){
    let regExFilter='';
    const { filter, choices } = this.props;
    switch(filter.length){
      case 0:
        break;
      case 1:
        regExFilter = `^${filter}`;
        break;
      default:
        regExFilter = `${filter}`;
    }
    return choices.filter( choice => {
      return choice.value.match(new RegExp(regExFilter, 'i')) ? true : false;
    });
  }
  getIndex(rawIndex, limit){
    if(rawIndex < 0){
      return limit - (-1 * rawIndex % limit);
    } else if (rawIndex > 0 ){
      return rawIndex % limit;
    } else if ( rawIndex === 0 ){
      return rawIndex
    }
  }
  renderChoices(){
    const filteredChoices = this.filterChoices();
    const indexToHighlight = this.getIndex(this.props.highlightedIndex ,filteredChoices.length);
    console.log(this.props.highlightedIndex, indexToHighlight)
    const renderedChoices = filteredChoices.map((choice, index)=> {
      const tagClasses = cx("dropdown-choice", {selected:choice.isSelected}, {highlighted:index===indexToHighlight});
      return <div className={tagClasses}
           key={choice.id}
           onClick={ev => {
             ev.stopPropagation();
             this.props.selectionClickHandler(choice);
           }}>
        {this.props.renderChoice(choice)}
      </div>
    });

    return renderedChoices.length ?  renderedChoices : this.props.renderNoChoices()
  }
  render(){
    return <div className="dropdown-container"
                onClick={this.callClose}
                onKeyPress={ev=>{
                  console.log(ev);
                }}>
        <button className="btn-default btn-naked no-border"
                style={{
                  position:'absolute',
                  right: '-3em',
                  top: 0
                }}
                onClick={this.callClose}>
          <span className="icon-close icon-lg"></span>
        </button>
        <div className="esc-hint" style={{
            fontSize:'.8em',
            margin:'0 .2em 1em 0',
            padding: '0 1em'
          }}>
          <span className="key-block">esc</span>
          <span>to close</span>
        </div>
        <div>
          {this.renderChoices()}
        </div>

    </div>;
  }
}


export default class AutoCompleteSelector extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:'',
      showChoices:false,
      highlightedIndex:0,
    }
  }
  isDuplicateTag(tagName){
    const lowercaseTagName = tagName.toLowerCase();
    return this.props.tags.find( tag => tag.value === lowercaseTagName );
  }
  handleTagInputChange(term){
    this.setState({searchTerm:term});
  }
  handleClearClick(){
    this.setState({searchTerm:''});
  }
  handleSpecialKeys(ev){
    console.log('handle special key');
    switch (ev.which) {
      case ENTER_KEY:
        const newTag = ev.target.value;
        const { onEnter, closeOnSelect } = this.props;
        if(newTag){
          console.log('enter handler');
          onEnter && onEnter();
          if(closeOnSelect){
            this.handleAutoCompCloseClick();
          }
        }
        break;
      case DOWN_KEY:
        console.log('down');
        ev.preventDefault();
        this.handleUpDownKey(DOWN_KEY);
        break;
      case UP_KEY:
        ev.preventDefault();
        this.handleUpDownKey(UP_KEY);
        break;
      default:
        this.resetHighlightedIndex();
    }

      // const duplicateTag = this.isDuplicateTag(newTag);
      // if(duplicateTag){
      //   this.props.selectionHandler(duplicateTag,true);
      // } else {
      //   this.props.createNew();
      //   // const addTagAction = addTag(newTag);
      //   // this.props.dispatch(addTagAction);
      //   // this.props.selectionHandler(addTagAction.tag,true);
      // }
      // ev.target.select();
  }
  resetHighlightedIndex(){
    this.setState({highlightedIndex:0});
  }

  handleUpDownKey(whichKey){
    const index = this.state.highlightedIndex;

    switch(whichKey){
      case DOWN_KEY:
        this.setState({highlightedIndex:index + 1});
        break;
      case UP_KEY:
        this.setState({highlightedIndex:index - 1});
        break;
    }

  }
  handleSelectionClick = (choice) => {
    const {selectionClickHandler, closeOnSelect} = this.props;
    selectionClickHandler && selectionClickHandler(choice);
    if(closeOnSelect){
      this.handleAutoCompCloseClick();
    }
  }
  handleAutoCompCloseClick = () => {
    this.setState({showChoices:false});
  }
  renderAutoComplete(){
    return <AutoCompleteDropdown filter={this.state.searchTerm}
                                 closeClickHandler = {this.handleAutoCompCloseClick}
                                 {...this.props}
                                 selectionClickHandler= {this.handleSelectionClick}
                                 highlightedIndex={this.state.highlightedIndex}/>;
  }
  render(){
    const {searchTerm, showChoices, duplicateTag} = this.state;
    const closeIconClasses = cx("btn-naked", "no-border", "icon-close", "fader", {faded: !searchTerm});
    const autoCompleteClasses = cx("auto-complete-container", {open: showChoices});
    return <div style={{position:'relative'}}>
      <div className="search-input-holder" style={{position:'relative'}}>
        <button className={closeIconClasses}
             style={{
                      position:'absolute',
                      right:0,
                      top:'0.8em'
                    }}
             onClick = {()=> {this.handleClearClick()}}>
        </button>

        <input type="text"
               style={{paddingRight:'1em'}}
               placeholder={this.props.inputPlaceholder}
               value={searchTerm}
               onFocus={ev => {
                 this.setState({showChoices:true})
               }}
               onKeyDown={ev => {
                 console.log('hi')
                 this.handleSpecialKeys(ev);
               }}
               onChange={ev => {
                 this.handleTagInputChange(ev.target.value);
               }}/>

        <div className={autoCompleteClasses}
              style={{position:'absolute',
                 top:'3em',
                 left:0,
                 width:'100%'
               }}>
           { showChoices ? this.renderAutoComplete() : ''}
         </div>
         <div className="selected-tags flex-parent-row wrap"
              style={{
                margin:'0 -.2em'
              }}>
           {this.props.renderResults([])}
         </div>
      </div>
    </div>;
  }
}
