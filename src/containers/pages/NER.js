import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { SenTaggers } from '../../components/SentenceTaggers'
import NERStatistics from '../../components/NERStatistics'


export default class NERPage extends Component {
  render (){
    return (
      <div>
        <h1>Sentence Taggers</h1>
        <ul>
          <li><Link to='/ner/tagging'>Tagging</Link></li>
          <li><Link to='/ner/statistics'>Statistics</Link></li>
        </ul>
        <Switch>
          <Route exact path='/ner' component={SenTaggers}/>
          <Route path='/ner/tagging' component={SenTaggers}/>
          <Route path='/ner/statistics' component={NERStatistics}/>
        </Switch>
      </div>
    )
  }
}