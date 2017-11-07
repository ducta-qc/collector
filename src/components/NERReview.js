import React, { Component } from 'react'
import { TaskBox } from './SentenceTaggers'
import { Switch, Route } from 'react-router-dom'
import { nerAPI } from '../api/Sentence'
import '../css/NERReview.css'
import '../css/common.css'


var PAGE_COUNT = 20;

class SentenceTable extends Component{
  constructor (props){
    super(props);
    this.minPage = 0;
    this.maxPage = 0;
    this.page = 0;
    this.numOfSens = 0;
    this.numOfPages = 0;
    this.pageCount = PAGE_COUNT;
    this.task = props.task;
    if(props.match.params.page !== undefined){
      this.page = parseInt(props.match.params.page, 10);
      if (isNaN(this.page)){
        this.page = 0;
      }
    }

    this.minPage = this.page;
    this.maxPage = this.page;

    this.state = {
      page: this.page,
      numOfPages: this.numOfPages,
      elems: [],
      pageLinks: [],
      minPage: 0,
      maxPage: 0
    }
  }

  reportSentence(senId, senIdx, sentences){
    sentences[senIdx].report = 1;
    this.displayByPage(sentences);
    nerAPI.reportSentence(
      {id: senId},
      function (result){
        // console.log("Report success");
      },
      function (err){
        console.log("Report sentence " + senId + " error!", err);
      });
  }

  untagSentence(senId, senIdx, sentences){
    if(sentences[senIdx].tagged){
      sentences[senIdx].tagged = 0;
      nerAPI.untagSentence(
        {id: senId},
        function (result){
          // console.log("Untag success");
        },
        function (err){
          console.log("Untag sentence " + senId + " error!", err);
        });
      this.displayByPage(sentences);
    }
  }

  displayPageLink(){
    var pageLinks = [];
    
    for (var i=this.minPage; i <= this.maxPage; i++){
      var active = (i === this.page);
      pageLinks.push(
        <li className={active?"not-underline":""} key={"_"+i}><a onClick={this.handlePageChange.bind(this, i)}>{i}</a></li>
      )
    }

    return pageLinks;
  }

  displayByPage(sentences){
    var elems = [];
    for (var i=0; i < sentences.length; i++){
      elems.push(
        <tr key={sentences[i].id}>
          <td className="sentence">{sentences[i].sentence}</td>
          <td className="sentence">{sentences[i].taggedSentence}</td>
          <td className="intent">{sentences[i].intent}</td>
          <td className="intent">{sentences[i].subIntent}</td>
          <td className={"tagged" + (sentences[i].tagged?" true":"")}>{sentences[i].tagged?"✔":"✗"}</td>
          <td className={"report" + (sentences[i].report?" true":"")}>{sentences[i].report?"✗":"✔"}</td>
          <td className="action">
            <button onClick={this.untagSentence.bind(this, sentences[i].id, i, sentences)}>Untag</button>
            <button onClick={this.reportSentence.bind(this, sentences[i].id, i, sentences)}>Report</button>
          </td>
        </tr>
      )
    }

    this.setState({
      elems: elems, 
      page: this.page, 
      numOfPages: this.numOfPages, 
      pageLinks: this.displayPageLink(),
      minPage: this.minPage,
      maxPage: this.maxPage
    });
  }

  countingSentences(fetchFirst){
    nerAPI.countNERSentences(
      {task: this.task},
      function (results){
        this.numOfSens = results.senCount;
        this.numOfPages = Math.floor(this.numOfSens / this.pageCount);
        if(this.page === 0){
          this.page = 1;
        }
        this.page = Math.min(this.page, this.numOfPages+1);
        this.minPage = this.page;
        this.maxPage = Math.min(this.minPage+10, this.numOfPages+1);

        if(fetchFirst){
          this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
        }
      }.bind(this),
      function (err){
        this.numOfSens = 0;
        this.page = 0;
      }.bind(this))
  }

  componentWillMount(){
    // count number sentence for a task
  }

  fetchSentences(offset, limit, self){
    nerAPI.pagingSentence(
        {offset:offset, limit: limit},
        function (results){
          self.displayByPage(results);
        },
        function (err){
          self.page = 0;
          self.numOfSens = 0;
          self.numOfPages = 0;
          alert("A error occur when fetching sentences");
        })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.task !== nextProps.task){
      this.task = nextProps.task;
      this.countingSentences(true);
      return;
    }

    var page = parseInt(nextProps.match.params.page, 10);
    if (isNaN(page)){
      page = 0;
    }

    if(page !== this.page && page !== 0){
      this.minPage = this.page;
      this.maxPage = Math.min(this.minPage+10, this.numOfPages+1);
      this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
    }
  }

  componentDidMount(){

  }

  handleFirstBt(e){
    window.history.pushState("", "", "/ner/review/1");
    this.page = 1;
    this.minPage = 1;
    this.maxPage = Math.min(1+10, this.numOfPages + 1);
    this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
  }

  handlePrevBt(e){
    if(this.page === 1){
      return;
    }
    this.page -= 1;
    window.history.pushState("", "", "/ner/review/" + this.page);
    if(this.page < this.minPage){
      this.minPage -= 1;
      this.maxPage = Math.min(this.minPage + 10, this.numOfPages+1);
    }
    this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
  }

  handlePageChange(targetPage){
    this.page = targetPage;
    this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
  }

  handleNextBt(e){
    if(this.page === (this.numOfPages + 1)){
      return;
    }
    this.page += 1;
    window.history.pushState("", "", "/ner/review/" + this.page);

    if(this.page > this.maxPage){
      this.maxPage += 1;
      this.minPage = Math.max(this.maxPage-10, 1);
    }
    this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
  }

  handleLastBt(e){
    window.history.pushState("", "", "/ner/review/" + (this.numOfPages + 1));
    this.page = this.numOfPages + 1;
    this.minPage = this.page;
    this.maxPage = this.page;
    this.fetchSentences((this.page-1)*this.pageCount, this.pageCount, this);
  }

  render (){
    var display = (
      <div className="padding-top-20px">
        <div className="review-table-container">
          <table className="review-table">
            <tbody>
              <tr className="review-col">
                <th className="sentence">Raw Sentence</th>
                <th className="sentence">Processed Sentence</th>
                <th>Main Intent</th>
                <th>Sub Intent</th>
                <th className="tagged">Tagged</th>
                <th className="reported">Not Reported</th>
                <th className="action">Action</th>
              </tr>
              {this.state.elems}
            </tbody>
          </table>
          <div className="page-numbers-container">
            <ul className="page-numbers">
              <li>Page:</li>
              <li><a onClick={this.handleFirstBt.bind(this)}>First</a></li>
              <li><a onClick={this.handlePrevBt.bind(this)}>Prev</a></li>
              {this.state.pageLinks}
              <li><a onClick={this.handleNextBt.bind(this)}>Next</a></li>
              <li><a onClick={this.handleLastBt.bind(this)}>Last</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
    return(
      ((this.state.page !== 0)?display:(null))
    )
  }
}

export default class NERReview extends Component {
  constructor(props){
    super(props);
    this.currTask = "";
    this.state = {
      nerTasks: []
    };
  }

  componentWillMount(){
    // Get NER tasks in database
    nerAPI.getNERTasks({},
      function (allTasks){
        this.currTask = allTasks[0];
        this.setState({nerTasks: allTasks});
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
    return(
      <div className="review-page">
        <div className="inline">
          <span className="text-bold-600"> Task: </span>
          <TaskBox ref="taskInput" list={this.state.nerTasks} 
          callback={this.changeTaskCallback.bind(this)}></TaskBox>
        </div>
        <Switch>
          <Route exact path='/ner/review' 
            render={
              function(props){return(<SentenceTable {...props} task={this.currTask}></SentenceTable>)}.bind(this)
            } />
          <Route path='/ner/review/:page' 
            render={
              function(props){return(<SentenceTable {...props} task={this.currTask}></SentenceTable>)}.bind(this)
            } />
        </Switch>
      </div>
    )
  }
}