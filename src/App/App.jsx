import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Header from '../Components/Header/Header.jsx'
import Pagecontent from '../Components/Pagecontent/Pagecontent.jsx'

class App extends Component {
  constructor () {
    super()
    this.state = {
      showcount: 10,
      newstories : [],
      topstories: [],
      beststories: [],
      newstoriesID: [],
      topstoriesID: [],
      beststoriesID: [],
      newstoriespage: 1,
      topstoriespage: 1,
      beststoriespage: 1,
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
        this.setState({...update}, () => this.getStories(tab))
      })
  }

  async getStories (tabName) {
    var page = this.state[`${tabName.slice(0, -2)}page`]
    var arr = this.state[tabName]
      .slice(page-1, page * this.state.showcount)
      .map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`))
    var promiseArr = await Promise.all(arr.map(p => p.catch(e => e)))
    var dataArr = await Promise.all(promiseArr.map(x => x.json()))
    this.setStories(tabName.slice(0, -2), dataArr)
  }

  setStories (tabName, storyArr) {
    var prevArr = this.state[tabName]
    var newArr = [...prevArr, ...storyArr]
    var update = {[tabName]: newArr}
    //console.log(update)
    this.setState({
      ...update
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/'  render={props => <Header {...props} 
            getStoryIds={this.getStoryIds}/>} />
          <Route path="/" render={props => <Pagecontent {...props} 
            data={this.state}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
