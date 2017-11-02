import React, { Component } from 'react'
import { TaskBox } from './SentenceTaggers'
import { nerAPI } from '../api/Sentence'
import '../css/NERStatistics.css'

class TaskStat extends Component {
  constructor (props){
    super(props);
    this.state = {
      intentElems:[],
      reportElem:null
    }
  }

  componentWillMount() {
    this.buildElems(this.props);
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps){
    this.buildElems(nextProps);
  }

  buildElems(props){
    if(props.statInfo == null){
      return;
    }
    var elems = [];
    var intentStat = props.statInfo.intentStat;
    var reportStat = props.statInfo.reportStat;
    var intents = Object.keys(intentStat);;

    elems.push(
      <tr className="intent-stat-item" key={'*_0'}>
        <td><b>Total</b></td>
        <td className="tagged-stat-item">{intentStat['*'].tagged}</td>
        <td className="untagged-stat-item">{intentStat['*'].untagged}</td>
      </tr>
    );
    elems.push(
      <tr className="intent-stat-item" key={'_1'}>
        <td><b>NULL</b></td>
        <td className="tagged-stat-item">{intentStat[''].tagged}</td>
        <td className="untagged-stat-item">{intentStat[''].untagged}</td>
      </tr>
    );

    for (var i=0; i < intents.length; i++){
      if (intents[i] === "*" || 
          intents[i] === ""){
        continue;
      }
      elems.push(
        <tr className="intent-stat-item" key={intents[i]+'_'+i}>
          <td>{intents[i]}</td>
          <td className="tagged-stat-item">{intentStat[intents[i]].tagged}</td>
          <td className="untagged-stat-item">{intentStat[intents[i]].untagged}</td>
        </tr>);
    }

    var reportElem = (<div>Reported: {reportStat}</div>)

    this.setState({intentElems: elems, reportElem: reportElem});
  }

  render (){
    return(
      <div>
        <div>
          <div className="stat-text text-bold-600">Reported</div>
          <div>
            {this.state.reportElem}
          </div>
          <div className="stat-text text-bold-600">Intent statistics:</div>
          <table className="stat-table">
            <tbody>
              <tr className="stat-col">
                <th>Intent</th>
                <th className="tagged-col">Tagged</th>
                <th className="untagged-col">Untagged</th>
              </tr>
              {this.state.intentElems}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default class NERStatistics extends Component {
  constructor (props){
    super(props);
    this.currTask = "";
    this.state = {
      nerTasks: [],
      statInfo: null,
    };

  }

  componentDidMount() {
    // Get NER tasks in database
    nerAPI.getNERTasks({},
    function (allTasks){
      this.currTask = allTasks[0];
      this.setState({nerTasks: allTasks});

      nerAPI.getNERTasksStat(
        {task: this.currTask},
        function (statInfo){
          this.setState({statInfo: statInfo});
        }.bind(this),
        function (err){
          alert("Get statistics information error");
        }
      )
    }.bind(this))
  }

  changeTaskCallback(oldValue, newValue){
    nerAPI.getNERTasksStat(
      {task: newValue},
      function (statInfo){
        this.setState({statInfo: statInfo});
      }.bind(this),
      function (err){
        alert("Get statistics information error");
      }
    )
  }

  render (){
    var displayStat = (this.state.nerTasks.length > 0);
    return (
      <div className="statistic-page">
        {displayStat ?(
        <div>
          <div className="inline">
            <span className="text-bold-600"> Task: </span>
            <TaskBox ref="taskInput" list={this.state.nerTasks} callback={this.changeTaskCallback.bind(this)}></TaskBox>
          </div>
          <TaskStat statInfo={this.state.statInfo}></TaskStat>
        </div>):
        (null)}
      </div>
    )
  }
}