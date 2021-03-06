import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NERPage from './pages/NER'
import io from 'socket.io-client'

const isBrowser = typeof window !== 'undefined';
export default class App extends Component {
  componentWillMount(){
    if(isBrowser){
      window.socket = io('http://'+window.location.host);
    }
  }
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={NERPage}/>
          <Route path="/ner" component={NERPage}/>
        </Switch>
      </div>
    )
  }
}
  