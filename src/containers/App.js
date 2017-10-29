import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NERPage from './pages/NER'

export default class App extends Component {
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
