import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function studyEs6(){
  function* exec(){
    for(let i=0;i<6;i++){
      let b = yield;
      console.log(b);
    }
  }

  let it = exec();
  it.next();
  var delay=1000;

  function dfun(ii){
    it.next(ii);
    setTimeout(function(){
      ii++;
      if(ii<6){
        if(ii===4){
          delay=5000;
        }
        dfun(ii);
      }
    }, delay);
  }

  dfun(0);

}


class App extends Component {
  render() {
    studyEs6();
    return (
      <div className="App">
        你好，react
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
  
}


export default App;
