import React, { Component } from 'react';

import Header from '../Components/Header/Header.jsx'
import Content from '../Components/Content/Content.jsx'

class App extends Component {
  constructor () {
    super()
    this.state = {
      new : [],
      top: [],
      best: [],
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

  render() {
    return (
      <div className="App">
        <Header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Well to React</h1>
        </Header>
        <Content/>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
