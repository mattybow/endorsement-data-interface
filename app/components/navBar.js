import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

const links = [
  {
    route:'/tweets',
    text:'Tweets'
  },
  {
    route:'/candidates',
    text:'Candidates'
  },
  {
    route:'/endorsers',
    text:'Endorsers'
  },
  {
    route:'/endorsements',
    text:'Endorsements'
  },
  {
    route:'/tags',
    text:'Tags'
  }
];

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      route:undefined
    };
  }
  clickHandler(route){
    this.setState({route});
  }
  render(){
    console.log(this.state.route);
    const activeRoute = this.state.route || window.location.pathname;
    const style = {
      textAlign:'center',
      padding:'10px 0'
    };
    const activeStyle = {
      ...style,
      borderBottom:'1px solid #A06CD5',
    };
    const elements = links.map( link => {
      const isActive = activeRoute === link.route || (activeRoute === '/' && link.route === '/tweets');
      return (
        <div className="flex-child-expand" style={isActive ? activeStyle : style} key={link.text}>
          <Link to={link.route} onClick={this.clickHandler.bind(this,link.route)}>{link.text}</Link>
        </div>
      );
    });
    return <div className="flex-parent-row"
                style={{
                  padding:'0 20px',
                  borderTop:'1px solid #E7E7EC',
                  boxShadow:'inset 0 -1px 0 #E7E7EC'}}>
      {elements}
    </div>;
  }
}
