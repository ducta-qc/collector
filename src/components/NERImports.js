import React, { Component } from 'react'
import '../css/NERImports.css'
import '../css/common.css'
import { nerAPI } from '../api/Sentence'


class MethodBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      method: "manual"
    };
  }

  handleChange(e){
    var oldMethod = this.state.method;
    this.setState({method: e.target.value});
    this.props.callback(oldMethod, e.target.value)
  }

  render (){
    return(
      <div>
        <select value={this.state.method} onChange={this.handleChange.bind(this)}>
          <option value="manual">Manual</option>
          <option value="from_csv_file">From *.CSV file</option>    
        </select>
      </div>
    )
  }
}


class ImportManual extends Component {
  constructor(props){
    super(props);
    this.state = {
      senInfo:{
        task: "",
        sentence: "",
        intent: ""
      },
      errMsg: "Sentence field and task field must be not null",
      displayError: false,
    }
    this.senInfo = this.state.senInfo;
    this._isMounted = false;
  }

  componentDidMount(){
    document.addEventListener("keydown", this.enter.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
    document.removeEventListener("keydown", this.enter.bind(this));
  }

  enter(e){
    if(e.key === "Enter" && this._isMounted){
      this.manualSubmit();
    }
  }

  manualSubmit(e){
    if(this.senInfo.sentence === "" || this.senInfo.task === ""){
      this.setState({errMsg: "Sentence field and task field must be not null", displayError: true});
      return;
    }
    nerAPI.importUntaggedSentence(
      {untaggedSens:[this.state.senInfo]},
      function (result){
        this.senInfo = {
          sentence:"",
          intent: "",
          task:this.state.senInfo.task
        }
        this.setState({senInfo: this.senInfo, displayError: false});
      }.bind(this),
      function (err){
        this.setState({errMsg: err.message, displayError: true})
      }.bind(this))
  }

  handleTaskChange(e){
    this.senInfo.task = e.target.value;
    this.setState({senInfo:this.senInfo});
  }

  handleSenChange(e){
    this.senInfo.sentence = e.target.value;
    this.setState({senInfo: this.senInfo});
  }

  handleIntentChange(e){
    this.senInfo.intent = e.target.value;
    this.setState({intent: this.senInfo});
  }
  
  render (){
    return(
      <div className="manual-import">
        <div className="manual-task">
          <div className="text-bold-600">Task:</div>
          <input type="text" name="task" 
            value={this.state.task} onChange={this.handleTaskChange.bind(this)}/>
        </div>
        <div className="manual-sentence">
          <div className="text-bold-600">Sentence:</div>
          <input type="text" name="sentence" 
            value={this.state.sentence} onChange={this.handleSenChange.bind(this)}/>
        </div>
        <div className="manual-intent">
          <div className="text-bold-600">Intent:</div>
          <input type="intent" name="intent" 
            value={this.state.intent} onChange={this.handleIntentChange.bind(this)}/>
        </div>
        {this.state.displayError ?
        (<div className="manual-error-msg">{this.state.errMsg}</div>):
        (null)}
        <div className="manual-submit">
          <button onClick={this.manualSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}

class ImportFromCSV extends Component {
  constructor (props){
    super(props);
    this.state = {
      task: "",
      errMsg: "Task field must be not null",
      displayError: false,
      displaySendInfo: false,
      countSent: 0,
      totalSend: 0,
      countErrorSen: 0,
      disableSubmitBt: false
    };
    this._isMounted = false;
    this.countSent = 0;
    this.totalSend = 0;
    this.countErrorSen = 0;
    this.sendCount = 0;
    this.sendLength = 0;
    this.bucket = []
  }

  handleTaskChange (e){
    this.setState({task: e.target.value});
  }

  componentDidMount (){
    document.addEventListener("keydown", this.enter.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount (){
    this._isMounted = false;
    document.removeEventListener("keydown", this.enter.bind(this));
  }

  enter (e){
    if(e.key === "Enter" && this._isMounted){
      this.csvSubmit();
    }
  }

  recvConfirm (data){
    var io = window.socket; //defined at App.js
    this.countSent += data.length;
    for(var i=0; i < this.sendLength; i++){
      this.bucket.shift();
    }
    this.setState({countSent: this.countSent})


    if ((this.countSent + this.countErrorSen) === this.totalSend){
      this.setState({disableSubmitBt: false});
      setTimeout(function(){ alert("Import Success!"); }, 100);
    }else{
      this.sendCount += 1;
      var buffer = this.bucket.slice(0, 200);
      this.sendLength = buffer.length;
      io.emit('recv_untagged_sentence', buffer);
    }
  }

  csvFileChange (e){
    this.countSent = 0;
    this.totalSend = 0;
    this.countErrorSen = 0;
    this.setState({
      displayError: false, 
      displaySendInfo:false,
      countSent: this.countSent,
      totalSend: this.totalSend,
      countErrorSen: this.countErrorSen});
  }

  csvSubmit (e){
    if (this.state.task === ""){
      this.setState({errMsg: "Task field must be not null", displayError: true});
      return;
    }

    var file = this.refs.csvInput.files[0];
    if (file.size >= 100*1024*1024){
      this.setState({errMsg: "File doesn't exceed 100Mb", displayError: true});
      return;
    }
    this.setState({displayError: false});
    var reader = new FileReader();
    var self = this;
    var io = window.socket; //defined at App.js

    reader.onload = function(progressEvent){
      var lines = this.result.split('\n');
      var sentence = "";
      var task = self.state.task;
      var intent = "";
      io.on('confirm_recv_untagged_sentence', self.recvConfirm.bind(self));
      self.totalSend = lines.length;
      self.setState({displaySendInfo: true, totalSend: self.totalSend, disableSubmitBt: true});
      
      var i = 0;
      while(i < lines.length){
        var lastCommasIdx = lines[i].lastIndexOf(',');
        if(lastCommasIdx === -1){
          self.countErrorSen += 1;
          self.setState({countErrorSen: self.countErrorSen});
          i++;
          continue;
        }
        sentence = lines[i].substring(0, lastCommasIdx).trim();
        if(sentence === ""){
          self.countErrorSen += 1;
          self.setState({countErrorSen: self.countErrorSen});
          i++;
          continue; 
        }
        intent = lines[i].substring(lastCommasIdx+1, lines[i].length);
        self.bucket.push({
          sentence: sentence, intent: intent, task: task
        })
        i++;

        if(self.bucket.length % 200 === 0 && self.sendCount === 0){
          self.sendCount += 1;
          self.sendLength = self.bucket.length;
          io.emit('recv_untagged_sentence', self.bucket);
        }
      }
    }
    reader.readAsText(file);
  }

  render (){
    return(
      <div className="csv-import">
        <div className="csv-task">
          <div className="text-bold-600">Task:</div>
          <input type="text" name="task" value={this.state.task} onChange={this.handleTaskChange.bind(this)}/>
        </div>
        <div className="csv-file">
          <input ref="csvInput"type="file" name="csv"/>
        </div>
        {this.state.displaySendInfo ?
        (<div>Total:{this.state.totalSend} | Sent: {this.state.countSent} | Errors: {this.state.countErrorSen}</div>):
        (null)}
        {this.state.displayError ?
        (<div className="manual-error-msg">{this.state.errMsg}</div>):
        (null)}
        <div className="csv-submit">
          <button 
            disabled={this.state.disableSubmitBt} 
            onClick={this.csvSubmit.bind(this)} 
            onChange={this.csvFileChange.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}


export default class NERImports extends Component {
  constructor(props){
    super(props);
    this.state = {
      method: "manual"
    };
  }

  changeMethod (oldMethod, newMethod){
    if(oldMethod !== newMethod){
      this.setState({method: newMethod})
    }
  }

  renderWithMethod (){
    var elem = null;
    switch(this.state.method){
      case 'from_csv_file':
      elem = (<ImportFromCSV></ImportFromCSV>);
        break;
      case 'manual':
      default:
        elem = (<ImportManual></ImportManual>);

    }
    return elem;
  }

  render (){
    var elem = this.renderWithMethod();
    return(
      <div className="ner-imports">
        <MethodBox callback={this.changeMethod.bind(this)}></MethodBox>
        {elem}
      </div>
    )
  }
}
