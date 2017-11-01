import React, { Component } from 'react'
import { TaskBox } from './SentenceTaggers'

class SentenceTable extends Component{
  render (){
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <th>Sentence</th>
              <th>Intent</th>
              <th>Tagged</th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default class NERReview extends Component {
  render (){
    return(
      <div>
        <TaskBox></TaskBox>
        <SentenceTable></SentenceTable>
      </div>
    )
  }
}