import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Header from '../Components/Header/Header.jsx'
import Pagecontent from '../Components/Pagecontent/Pagecontent.jsx'

class App extends Component {
  constructor () {
    super()
    this.state = {
      newstories : [],
      topstories: [],
      beststories: [],
      'newstoriesID': [],
      'topstoriesID': [],
      'beststoriesID': [],
      story : {
          "by" : "",
          "descendants" : 0,
          "id" : 0,
          "kids" : [],
          "score" : 0,
          "time" : 0,
          "title" : "",
          "type" : "",
          "url" : ""
      },
    }
    // this.getStoryIds = this.getStoryIds.bind(this)
  }
  componentWillMount () {
    ['topstoriesID', 'beststoriesID', 'newstoriesID'].forEach(tab => {
      this.getStoryIds(tab)
    })
  }

  getStoryIds (tab) {
    return fetch(`https://hacker-news.firebaseio.com/v0/${tab.slice(0, -2)}.json?print=pretty`)
      .then(res => res.json())
      .then(data => {
        var update = {}
        update[tab] = data
        this.setState({...update})
      })
  }

  

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/'  render={props => <Header {...props} 
            getStoryIds={this.getStoryIds}/>} />
          <Route path="/" render={props => <Pagecontent {...props} data={this.state}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
