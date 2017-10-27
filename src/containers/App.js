import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TagDropdownMenu, SenTaggers } from '../components/SentenceTaggers'

export default class App extends Component {
  render(){
    return (
      <div>
        <h1>Sentence Taggers</h1>
        <SenTaggers></SenTaggers>
      </div>
    )
  }
}
