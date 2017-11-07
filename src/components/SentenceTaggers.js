import React, { Component } from 'react'
import '../css/SentenceTaggers.css'
import { nerAPI } from '../api/Sentence'
import { MAP_INTENTS_TO_TAGS } from '../types/car'
import { ERROR_CODES } from '../../src/types/errorCodes'


class TagDropdownMenu extends Component {
  constructor (props){
    super(props);
    this.selected = props.selected;
    this.defaultTag = props.list[0];
    this.callback = props.callback;
    this.tokIdx = props.tokIdx;

    var initState = {
      showTag: true,
      listVisible: false,
      display: ""
    }; 

    if (this.selected === ""){
      initState.showTag = false;
    }

    this.state = initState;
  }

  listItems (){
    var items = [];
    for (var i = 0; i < this.props.list.length; i++){
      var item = this.props.list[i];
      items.push(
        <div onClick={this.select.bind(this, item)} key={item}>
          <span className="tag-item">{item}</span>
        </div>
      );
    }

    return items;
  }

  select (item){
    this.selected = item;
    this.callback(this.selected, this.tokIdx);
  }

  show (){
    if (!this.state.listVisible){
      this.setState({ listVisible: true });
      this.hiddenBind = this.hidden.bind(this);
      document.addEventListener("click", this.hiddenBind);
    }
  }

  hidden (){
    if (this.state.listVisible){
      this.setState({ listVisible: false });
      document.removeEventListener("click", this.hiddenBind);
    }
  }

  cancelTag (){
    this.setState({ showTag: false });
    this.callback("", this.tokIdx);
  }

  addTag (){
    this.setState({ showTag: true });
    this.selected = this.defaultTag;
    this.callback(this.selected, this.tokIdx);
  }

  render (){
    var x = this.state.showTag ? 
    (
      <div className={"tags"}>
        <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
          <div 
            className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} 
            onClick={this.show.bind(this)}>
            <span className={"display-tag"}>{this.selected}</span>
            <span className={"cancel-tag"} onClick={this.cancelTag.bind(this)}>x</span>
          </div>
          <div className="dropdown-list">
            <div>{this.listItems()}</div>
          </div>
        </div>
      </div>
    ):
    (
      <div className={"tags"}>
        <div className={"add-tag"} onClick={this.addTag.bind(this)}>+</div>
      </div>
    )
    return x
  }
};

class TaskBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      elems: []
    }
    this.firstRecv = false;
  }

  updateWithProps(props, setDefault){
    var elems = [];
    for (var i=0; i < props.list.length; i++){
      elems.push(<option key={props.list[i]} value={props.list[i]}>{props.list[i]}</option>);
    }
    if(setDefault){
      this.setState({elems: elems, inputValue:props.list[0]});
      return;
    }
    this.setState({elems: elems});
  }

  componentWillReceiveProps(nextProps){
    if (!this.firstRecv){
      this.updateWithProps(nextProps, true);
      this.firstRecv = true;
    } else {
      this.updateWithProps(nextProps, false);
    }
  }

  componentDidMount() {
    this.updateWithProps(this.props, true);
  }

  handleChange(e) {
    var oldInputValue = this.state.inputValue;
    this.props.callback(oldInputValue, e.target.value);
    this.setState({inputValue: e.target.value});
  }

  render() {
    return(
      <div className="inline">
        <select value={this.state.inputValue} onChange={this.handleChange.bind(this)}>
          {this.state.elems}
        </select>
      </div>
    )
  }
};

class IntentMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      intent: this.props.initIntent,
      elems: []
    };
  }

  updateWithProps(props, intent){
    var elems = [];
    for (var i=0; i < props.list.length; i++){
      elems.push(<option key={props.list[i]} value={props.list[i]}>{props.list[i]}</option>);
    }
    if (!intent){
      if(intent === ""){
        this.setState({elems: elems, intent:""});  
      }else{
        this.setState({elems: elems});  
      }
    }else{
      this.setState({elems: elems, intent:intent});
    }
    
  }

  componentDidMount() {
    this.updateWithProps(this.props, null);
  }

  componentWillReceiveProps(nextProps){
    this.updateWithProps(nextProps, nextProps.initIntent);
    // this.props.callback(oldValue, nextProps.initIntent);
  }

  handleChange(e) {
    var oldValue = this.state.intent;
    this.setState({intent:e.target.value});
    this.props.callback(oldValue, e.target.value);
  }

  render() {
    return (
      <div className="inline">
        <select value={this.state.intent} onChange={this.handleChange.bind(this)}>
          {this.state.elems}
        </select>
      </div>
    )
  }
}

var DEFAULT_ERROR_TEXT = "Please fill the task field and press submit button to get a sample"; 

class SenTaggers extends Component {
  constructor (props){
    super(props);
    var sortedMainIntents = Object.keys(MAP_INTENTS_TO_TAGS).sort();
    var sortedSubIntents = Object.keys(MAP_INTENTS_TO_TAGS[sortedMainIntents[0]]).sort();
    this.tags = MAP_INTENTS_TO_TAGS[sortedMainIntents[0]][sortedSubIntents[0]]
    this.state = {
      elemToks: [],
      errorDisplayText: DEFAULT_ERROR_TEXT,
      nerTasks: [],
      mainIntents: sortedMainIntents,
      mainIntent: sortedMainIntents[0],
      subIntents: sortedSubIntents,
      subIntent: sortedSubIntents[0]
    };
    this.initParams();
    this._isMounted = false;
  }

  initParams(){
    this.currSenId = "";
    this.currSen = "";
    this.currMainIntent = this.state.mainIntent;
    this.currSubIntent = this.state.subIntent;
    this.orgMainIntent = "";
    this.orgSubIntent = "";
    this.currTags = [];
    this.tokens = [];
  }

  componentDidMount() {
    // Get NER tasks in database
    this._isMounted = true;
    nerAPI.getNERTasks({},
    function (results){
      this.setState({nerTasks: results});
    }.bind(this))
  }

  updateTags(tagName, tokIdx){
    this.currTags[tokIdx] = tagName;
  }

  renderTokens() {
    // var subIntents = this.state.subIntents;

    // if(this.state.mainIntents.indexOf(this.currIntent) === -1){
    //   intents = [this.currIntent].concat(intents);
    // }
    this.tokens = this.currSen.split(" ");
    this.currTags = [];
    for (var i=0; i < this.tokens.length; i++){
      this.currTags.push(this.tags[0]);
    }

    var elemToks = [];
    for (i=0; i < this.tokens.length; i++){
      elemToks.push(
        <div className={"sentence-inline"} key={this.tokens[i]+"_"+i}>
          {this.tokens[i]}
          <TagDropdownMenu 
            list={this.tags} 
            selected={this.currTags[i]} tokIdx={i} callback={this.updateTags.bind(this)}>
          </TagDropdownMenu>
        </div> );
    }
    this.setState({ elemToks: elemToks,
                    mainIntent: this.currMainIntent, 
                    subIntent:this.currSubIntent});
  }

  fetchRawSentence(){
    // Get a new sentence
    var taskElem = this.refs.taskInput;
    nerAPI.getRawSentence(
      {task: taskElem.state.inputValue},
      function (result){
        this.currSenId = result.id;
        this.currSen = result.sentence;
        this.orgMainIntent = result.intent;
        this.orgSubIntent = result.subIntent;
        // this.currMainIntent = result.intent;
        // this.currSubIntent = result.subIntent;
        
        var renderTokens = this.renderTokens.bind(this);
        renderTokens();
      }.bind(this),
      function (error){
        if (typeof error !== 'undefined'){
          if(error.name === ERROR_CODES.taggedSenNotFound.name){
            this.initParams();
            this.setState({elemToks:[], errorDisplayText: ERROR_CODES.taggedSenNotFound.message});
          }
        }
      }.bind(this)
    );  
  }

  submit(){
    var taskElem = this.refs.taskInput;
    if (this.currSen !== ""){
      // Submit tagged sentence
      var taggedToks = [];
      var concatToks = [];
      for (var i=0; i < this.currTags.length; i++){
        if (this.currTags[i] !== ""){
          concatToks.push(this.tokens[i] + "/" + this.currTags[i]);
          taggedToks.push(concatToks.join(" "));
          concatToks = [];
        }else{
          concatToks.push(this.tokens[i]);
        }
      }

      var taggedSen = taggedToks.join(" | ");
      taggedSen = taggedSen.trim();
      nerAPI.importTaggedSentence(
        {taggedSens:[
          {
            sentence: taggedSen, id: this.currSenId, 
            intent: this.currMainIntent, 
            task: taskElem.state.inputValue,
            subIntent: this.currSubIntent
          }]}, 
        function (result){
          var fetchRawSentence = this.fetchRawSentence.bind(this);
          fetchRawSentence(); 
        }.bind(this)
      );
    } else{
      this.fetchRawSentence();
    }
    
  }

  componentWillMount() {
    document.addEventListener("keydown", this.enter.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.enter.bind(this));
  }  

  enter(e) {
    if(e.key === "Enter"){
      this.submit();
    }
  }

  report(e) {
    var fetchRawSentence = this.fetchRawSentence.bind(this);
    nerAPI.reportSentence(
      {id: this.currSenId},
      function (result){
        fetchRawSentence(); 
      },
      function (err){
        alert(err.message);
        fetchRawSentence();
      }
    )
  }

  changeTaskCallback(oldValue, newValue){
    if(oldValue !== newValue){
      this.initParams();
      this.setState({
        elemToks: [],
        errorDisplayText: DEFAULT_ERROR_TEXT,
      });
    }
  }

  changeMainIntentCallback(oldValue, newValue){
    // if(oldValue !== newValue){
    this.currMainIntent = newValue;
    var subIntents = Object.keys(MAP_INTENTS_TO_TAGS[this.currMainIntent]).sort();
    this.currSubIntent = subIntents[0];
    this.tags = MAP_INTENTS_TO_TAGS[this.currMainIntent][this.currSubIntent];
    
    this.setState({subIntents: subIntents, 
                  mainIntent: this.currMainIntent, 
                  subIntent:this.currSubIntent});
    this.renderTokens();
    // }
  }

  changeSubIntentCallback(oldValue, newValue){
    // if(oldValue !== newValue){
    this.currSubIntent = newValue;
    this.tags = MAP_INTENTS_TO_TAGS[this.currMainIntent][this.currSubIntent];
    //console.log(this.tags);
    this.renderTokens();
    // } 
  }

  render (){
    var senIsNull = (this.state.elemToks.length === 0);

    return (
        <div className="sentence-taggers">
          <div>
            <div className="inline">
              <span className="text-bold-600"> Task: </span>
              <TaskBox ref="taskInput" list={this.state.nerTasks} callback={this.changeTaskCallback.bind(this)}></TaskBox>
            </div>
            <div className="inline intent-box">
              <span className="text-bold-600"> Main Intent: </span>
              <IntentMenu ref="mainIntentInput" list={this.state.mainIntents} 
              initIntent={this.state.mainIntent} callback={this.changeMainIntentCallback.bind(this)}></IntentMenu>
              <span className="text-bold-600 padding-left-20px"> Sub Intent: </span>
              <IntentMenu ref="subIntentInput" list={this.state.subIntents} 
              initIntent={this.state.subIntent} callback={this.changeSubIntentCallback.bind(this)}></IntentMenu>
            </div>
          </div>
          <div className="display-sentence">
            <p className="text-bold-600">Origin Main Intent: {this.orgMainIntent}</p>
            <p className="text-bold-600">Origin Sub Intent: {this.orgSubIntent}</p>
            <p className="text-bold-600">Sentence:</p>
            {(senIsNull ?  this.state.errorDisplayText : this.state.elemToks)}
          </div>
          <div className="bt-container">
            <div className="inline"><button className="submit-bt" 
                 onClick={this.submit.bind(this)}>Submit</button></div>
            <div className="inline"><button className="report-bt"
                 onClick={this.report.bind(this)}>Report</button></div>
          </div>

        </div>
    )
  }
};

export{TagDropdownMenu, SenTaggers, IntentMenu, TaskBox};
