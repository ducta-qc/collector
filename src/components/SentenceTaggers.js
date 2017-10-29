import React, { Component } from 'react'
import './SentenceTaggers.css'
import { nerAPI } from '../api/Sentence'
import { TAGS, INTENTS } from '../types/car'
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

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    if (this.selected !== nextProps.selected){
      this.selected = nextProps.selected;
      this.setState({ showTag: true });
    }
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
      inputValue: ""
    }
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return(
      <div className="inline">
        <input value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
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

  componentDidMount() {
    var elems = [];
    for (var i=0; i < this.props.list.length; i++){
      elems.push(<option key={this.props.list[i]} value={this.props.list[i]}>{this.props.list[i]}</option>);
    }
    this.setState({elems: elems});
    
  }

  componentWillReceiveProps(nextProps){
    if (this.props.initIntent !== nextProps.initIntent){
      this.setState({intent: nextProps.initIntent});
    }
  }

  handleChange(e) {
    this.setState({intent:e.target.value});
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

class SenTaggers extends Component {
  constructor (props){
    super(props);
    this.tags = TAGS;
    this.intents = INTENTS;

    this.state = {
      elemToks: [],
      errorDisplayText: "Please fill the task field and press submit button to get a sample"
    };

    this.currSen = "";
    this.intent = "";
    this.hash = "";
    this.currTags = [];
    this.tokens = [];
  }

  componentDidMount() {
  }

  updateTags(tagName, tokIdx){
    this.currTags[tokIdx] = tagName;
  }

  renderTokens() {
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
          <TagDropdownMenu list={this.tags} selected={this.currTags[i]} tokIdx={i} callback={this.updateTags.bind(this)}>
          </TagDropdownMenu>
        </div> );
    }
    this.setState({ elemToks: elemToks });
  }

  fetchRawSentence(){
    // Get a new sentence
    var taskElem = this.refs.taskInput;
    nerAPI.getRawSentence(
      {task: taskElem.state.inputValue},
      function (result){
        this.currSen = result.sentence;
        this.intent = result.intent;
        this.hash = result.hash;
        var renderTokens = this.renderTokens.bind(this);
        renderTokens();
      }.bind(this),
      function (error){
        if (typeof error !== 'undefined'){
          if(error.name === ERROR_CODES.taggedSenNotFound.name){
            this.currSen = "";
            this.intent = "";
            this.hash = "";
            this.currTags = [];
            this.tokens = [];
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
      var concatToks = "";
      for (var i=0; i < this.currTags.length; i++){
        if (this.currTags[i] !== ""){
          concatToks += (this.tokens[i] + "/" + this.currTags[i]);
          taggedToks.push(concatToks);
          concatToks = "";
        }else{
          concatToks += this.tokens[i];
        }
      }

      var taggedSen = taggedToks.join(" | ");
      
      nerAPI.importTaggedSentence(
        {taggedSens:[{sentence: taggedSen, hash: this.hash, intent: this.intent, task: taskElem.state.inputValue}]}, 
        function (result){
          var fetchRawSentence = this.fetchRawSentence.bind(this);
          fetchRawSentence(); 
        }.bind(this)
      );
    } else{
      this.fetchRawSentence();
    }
    
  }

  render (){
    var senIsNull = (this.state.elemToks.length === 0);
    return (
        <div className="sentence-taggers">
          <div>
            <div className="inline">
              <span className="text-bold-600"> Task: </span>
              <TaskBox ref="taskInput"></TaskBox>
            </div>
            <div className="inline">
              <span className="text-bold-600"> Intent: </span>
              <IntentMenu ref="intentInput" initIntent={this.intent} list={this.intents}></IntentMenu>
            </div>
          </div>
          <div className="display-sentence">
            <p class="text-bold-600">Sentence:</p>
            {(senIsNull ?  this.state.errorDisplayText : this.state.elemToks)}
          </div>
          <div className="bt-container">
            <div className="inline"><button className="submit-bt" onClick={this.submit.bind(this)}>Submit</button></div>
            <div className="inline"><button className="report-bt">Report</button></div>
          </div>

        </div>
    )
  }
};

export{TagDropdownMenu, SenTaggers};
