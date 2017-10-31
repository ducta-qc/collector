import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { SenTaggers } from '../../components/SentenceTaggers'
import NERStatistics from '../../components/NERStatistics'
import NERImports from '../../components/NERImports'
import './pages.css'


export default class NERPage extends Component {
  render (){
    return (
      <div>
        <div>
          <div className="task-header"><h1>Sentence Taggers</h1></div>
          <div className="task-nav">
            <ul className="horizontal">
              <li><NavLink to="/ner/tagging" activeClassName="active">Tagging</NavLink></li>
              <li><NavLink to="/ner/statistics">Statistics</NavLink></li>
              <li><NavLink to="/ner/import">Import</NavLink></li>
              <li><NavLink to="/ner/review">Review</NavLink></li>
              <li><NavLink to="/ner/guide">Guide</NavLink></li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route exact path="/ner" component={SenTaggers}/>
          <Route path="/ner/tagging" component={SenTaggers}/>
          <Route path="/ner/statistics" component={NERStatistics}/>
          <Route path="/ner/import" component={NERImports}/>
        </Switch>
      </div>
    )
  }
}