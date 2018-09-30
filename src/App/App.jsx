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
      newstoriespage: {
        currentpage: 1,
        maxpage: 0
      },
      topstoriespage: {
        currentpage: 1,
        maxpage: 0
      },
      beststoriespage: {
        currentpage: 1,
        maxpage: 0
      }
    }
    this.getStoryIds = this.getStoryIds.bind(this)
    this.getStories = this.getStories.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }

  componentWillMount () {
    this.initialize()
  }

  async initialize () {
    var initial = [];
    var final = {};
    var iter = ['topstoriesID', 'beststoriesID', 'newstoriesID']
    
    iter.forEach(tab => {
      let temp = this.getStoryIds(tab)
      initial.push(temp)
    })

    initial = await Promise.all(initial)
    
    iter.forEach((tab, i) => {
      final[tab] = initial[i]
      final[`${tab.slice(0, -2)}page`] = {
        currentpage: 1,
        maxpage: Math.ceil(initial[i].length/this.state.showcount)
      }
    })
    initial = []

    iter.forEach((tab, i) => {
      var temp = this.getStories(tab, 1, final[tab])
      initial.push(temp)  
    })
     initial = await Promise.all(initial)
    
    iter.forEach((tab, i) => {
      final[tab.slice(0, -2)] = initial[i]
    })

    this.setState({
      ...final
    })
  }

  async getStoryIds (tab) {
    var req = await fetch(`https://hacker-news.firebaseio.com/v0/${tab.slice(0, -2)}.json?print=pretty`)
    return req.json()
  }

  async getStories (tab, page, arr) {
    if (arr === undefined){
      arr = this.state[tab]
    }
    arr = arr.slice(page-1, page * this.state.showcount)
       .map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`))
    var promiseArr = await Promise.all(arr.map(p => p.catch(e => e)))
    return await Promise.all(promiseArr.map(x => x.json()))
  }

  pageChange(tabName, change) {
    console.log(`${tabName}page`)
    // this.setState({
    //   [`${tabName}page`]: this.state[`${tabName}page`]++
    // })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Route path="/"  render={props => <Header {...props} 
            getStoryIds={this.getStoryIds}/>} />
          
          <Route path="/" render={props => <Pagecontent {...props} 
            data={this.state} getStories={this.getStories} 
            pageChange={this.pageChange}/>} />
        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
