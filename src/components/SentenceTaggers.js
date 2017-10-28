import React, { Component } from 'react'
import './SentenceTaggers.css'

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
    this.setState({ listVisible: true });
    this.hidden_bind = this.hidden.bind(this);
    document.addEventListener("click", this.hidden_bind);
  }

  hidden (){
    this.setState({ listVisible: false });
    document.removeEventListener("click", this.hidden_bind);
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

class SenTaggers extends Component {
  constructor (props){
    super(props);
    this.tags = [
      'O',
      'CarBody',
      'CarColor',
      'CarFuel',
      'Cartirebrand',
      'CarTrasmission',
      'CarDimension',
      'OperatorCompare',
      'CarElement',
      'CarPosition',
      'CarPurposeUsage',
      'CarClass',
      'DateTime',
      'CarEngine',
      'CarWheelDrive',
      'CarStyle',
      'CarSize',
      'CarPriceCondition',
      'CarModel',
      'CarVersion',
      'CarBrand',
      'CarSeat',
      'CarPrice',
      'CarSeries',
      'CarYear',
      'LocationCity',
      'CarTransmission',
      'CarEngineDisplacement',
      'LocationDistrict',
      'LocationTown',
      'PhoneNumber',
      'CarDoor',
      'PhoneVerifyCode',
      'LocationProvince',
      'Email'
    ];
    this.state = {
      elemToks: []
    };
  }

  componentDidMount() {
    this.currSen = "This is sentence tagger";
    this.tokens = this.currSen.split(" ");
    this.currTags = [];
    for (var i=0; i < this.tokens.length; i++){
      this.currTags.push(this.tags[0])
    }

    this.renderTokens();
  }

  updateTags(tagName, tokIdx){
    this.currTags[tokIdx] = tagName;
  }

  renderTokens() {
    var elemToks = [];
    for (var i=0; i < this.tokens.length; i++){
      elemToks.push(
        <div className={"sentence-inline"} key={this.tokens[i]+"_"+i}>
          {this.tokens[i]}
          <TagDropdownMenu list={this.tags} selected={this.currTags[i]} tokIdx={i} callback={this.updateTags.bind(this)}>
          </TagDropdownMenu>
        </div> );
    }
    this.setState({ elemToks: elemToks });
  }

  render (){
    return (
        <div>
          {this.state.elemToks}
          <button className="submit-bt">Submit</button>
        </div>
    )
  }
};

export{TagDropdownMenu, SenTaggers};
