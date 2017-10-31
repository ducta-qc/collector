import React, { Component } from 'react'
import './NERImports.css'


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
  manualSubmit(e){

  }

  render (){
    return(
      <div className="manual-import">
        <div className="manual-task">
          <div>Task:</div>
          <input type="text" name="task"/>
        </div>
        <div className="manual-sentence">
          <div>Sentence:</div>
          <input type="text" name="sentence"/>
        </div>
        <div className="manual-intent">
          <div>Intent:</div>
          <input type="intent" name="intent"/>
        </div>
        <div className="manual-submit">
          <button onClick={this.manualSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}

class ImportFromCSV extends Component {
  csvSubmit (e){

  }
  render (){
    return(
      <div>
        <div>
          <div>Task:</div>
          <input type="text" name="task"/>
        </div>
        <div>
          <input type="file" name="csv"/>
        </div>
        <div>
          <button onClick={this.csvSubmit.bind(this)}>Submit</button>
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
