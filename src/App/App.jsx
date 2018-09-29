import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Header from '../Components/Header/Header.jsx'
import Content from '../Components/Content/Content.jsx'

class App extends Component {
  constructor () {
    super()
    this.state = {
      newstories : [],
      topstories: [],
      beststories: [],
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
      }
    }
  }
  componentWillMount () {
    fetch(`https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          story: data
        })
      })
  }

  getStoryIds (tab) {
    fetch(` https://hacker-news.firebaseio.com/v0/${tab}.json?print=pretty`)
      .then(res => res.json())
      .then(data => {
        console.log(tab, data)
        // this.setState({
        //   tab: data
        // })
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Header}/>
          <Route path="/topstories" component={Content} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
