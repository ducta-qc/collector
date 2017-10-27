import React, { Component } from 'react'
import './SentenceTaggers.css'

class TagDropdownMenu extends Component {
  constructor (props){
    super(props);
    this.state = {
      listVisible: false,
      display: ""
    };
    this.selected = this.props.selected;
  }

  listItems (){
    var items = [];
    for (var i = 0; i < this.props.list.length; i++){
      var item = this.props.list[i];
      items.push(
        <div onClick={this.select.bind(this, item)} key={item}>
          <span>{item}</span>
        </div>
      );
    }

    return items;
  }

  select (item){
    this.selected = item;
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

  render (){
    return(
      <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
        <div 
          className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} 
          onClick={this.show.bind(this)}>
          <span>{this.selected}</span>
        </div>
        <div className="dropdown-list">
          <div>{this.listItems()}</div>
        </div>
      </div>
    )
  }
};

class SenTaggers extends Component {
  render (){
    var colours = ["Red", "Blue", "Green"];
    return (
        <div>
          <TagDropdownMenu list={colours} selected={colours[0]}></TagDropdownMenu>
          <div>This is sentence tagger</div>
        </div>
    )
  }
};

export{TagDropdownMenu, SenTaggers};
