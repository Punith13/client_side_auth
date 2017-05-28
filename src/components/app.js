import React, { Component } from 'react';
import Header from './header'; 

export default class App extends Component {
  render() {
    return (
        <div>
             <Header />
             {this.props.children}
        </div>
     
    );
  }
}

// when routes are nested , child components are present in this.props.children of the parent component, here it is App