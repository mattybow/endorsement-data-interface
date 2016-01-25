import React from 'react';
import TextInputField from './textInputField';
import Avatar from './avatar';
import { convertDate } from '../util';
import { colors } from '../styles/inlineConstants';
import moment from 'moment';

const {barney} = colors;
var EditEndorsementForm = (props) => {
  const { id, end_avatar, can_avatar, date, source, endorser, candidate, confirmed, modified, quote } = props;

  return <div className="form-contents">

      <div className="flex-parent-row"
           style={{
             margin:'20px 0 30px'
           }}>
        <div className="heads"
             style={{
               position:'relative'
             }}>
          <Avatar url={end_avatar}
                  size={50}/>
          <div style={{
              width:40,
              height:40,
              position:'absolute',
              right:-20,
              bottom:-20,
              backgroundImage:`url(${can_avatar})`,
              backgroundSize:'cover'
            }}></div>
        </div>

        <div className="flex-child-expand"
             style={{
                 marginLeft:30
               }}>
          <div>
            <span>{endorser}</span>
            <span style={{ fontSize:'.8em', margin:'0 .5em'}}>endorsed</span>
          </div>
          <div>{candidate}</div>
          <div style={{
              fontSize:'.8em',
              color:barney
            }}>
            updated {moment(new Date(modified)).fromNow()}
          </div>
        </div>
        <button className="btn-default flex-child-start desktop-only">
          <span>delete endorsement</span>
        </button>
        <button className="btn-default btn-naked no-border flex-child-start mobile-only"
                style={{
                  marginRight:-10
                }}>
          <span className="icon-trash-bin icon-lg"> </span>
        </button>
      </div>

    <div>
    <div className="flex-parent-row flex-row-end">
      <div>{confirmed ? 'Confirmed' : 'Not Confirmed'}</div>
      <div className="box flex-parent-row flex-row-center"
           style={{
             marginLeft:10,
             width:30,
             height:30,
             borderWidth:1,
             borderStyle:'solid',
             borderColor: confirmed ? barney :  'rgba(0,0,0,.3)'
           }}
           onClick={ () => {
             props.changeHandler({confirmed:!confirmed});
           }}>
           {confirmed ? <span className="icon-check-mark"
             style={{
               color: confirmed ? barney :  'inherit'
             }}></span> : ''}
      </div>
    </div>
    </div>

    <TextInputField label='Date'
                    value = {convertDate(date)}
                    placeholder="YYYY-MM-DD"
                    id={id}
                    changeHandler = {ev => {
                      props.changeHandler({date:ev.target.value});
                    }}/>
    <TextInputField label='Source'
                    value = {source}
                    id={id}
                    changeHandler = {ev => {
                      props.changeHandler({source:ev.target.value});
                    }}/>
    <TextInputField label='Quote'
                      value = {quote}
                      id={id}
                      changeHandler = {ev => {
                        props.changeHandler({quote:ev.target.value});
                      }}/>
  </div>
}

export default EditEndorsementForm
