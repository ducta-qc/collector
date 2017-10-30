import React, { Component } from 'react'
import { TaskBox } from './SentenceTaggers'
import { nerAPI } from '../api/Sentence'
import './NERStatistics.css'

class TaskStat extends Component {
  constructor (props){
    super(props);
    this.state = {
      intentElems:[],
      reportElem:null
    }
  }

  componentDidMount() {
    this.buildElems(this.props);
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

    elems.push(<div className="intent-stat-item" key={'*_0'}><b>Total</b> - Tagged: {intentStat['*'].tagged}, Untagged:{intentStat['*'].untagged}</div>);
    elems.push(<div className="intent-stat-item" key={'_1'}><b>Null</b> - Tagged: {intentStat[''].tagged}, Untagged:{intentStat[''].untagged}</div>);

    for (var i=0; i < intents.length; i++){
      if (intents[i] === "*" || 
          intents[i] === ""){
        continue;
      }
      elems.push(<div className="intent-stat-item" key={intents[i]+'_'+i}>{intents[i]} - Tagged: {intentStat[intents[i]].tagged}, Untagged: {intentStat[intents[i]].untagged}</div>);
    }

    var reportElem = (<div>Reported: {reportStat}</div>)

    this.setState({intentElems: elems, reportElem: reportElem});
  }

  render (){
    return(
      <div>
        <div>
          <div className="stat-text text-bold-600">Intent statistics</div>
          <div>
            {this.state.intentElems}
          </div>
          <div className="stat-text text-bold-600">Reported</div>
          <div>
            {this.state.reportElem}
          </div>
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
    return (
      <div className="statistic-page">
        <div>
          <div className="inline">
            <span className="text-bold-600"> Task: </span>
            <TaskBox ref="taskInput" list={this.state.nerTasks} callback={this.changeTaskCallback.bind(this)}></TaskBox>
          </div>
          <TaskStat statInfo={this.state.statInfo}></TaskStat>
        </div>
      </div>
    )
  }
}