import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from '../Components/Header/Header.jsx'
import Pagecontent from '../Components/Pagecontent/Pagecontent.jsx'
import Storypage from '../Components/Storypage/Storypage.jsx'
import Createpost from '../Components/Createpost/Createpost.jsx';
import Axios from 'axios';

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
      },
      modal: false,
      loggedin: false,
      user: ''
    }
    this.getStoryIds = this.getStoryIds.bind(this)
    this.getStories = this.getStories.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.tabswitch = this.tabswitch.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.onSignin = this.onSignin.bind(this)
    this.onSignout = this.onSignout.bind(this)
  }

  componentWillMount () {
    this.initialize()
  }

  async initialize () {
    var initial = [];
    var result = {};
    var iter = ['topstoriesID', 'beststoriesID', 'newstoriesID']
    
    iter.forEach(tab => {
      let temp = this.getStoryIds(tab)
      initial.push(temp)
    })

    initial = await Promise.all(initial)
    
    iter.forEach((tab, i) => {
      result[tab] = initial[i]
      result[`${tab.slice(0, -2)}page`] = {
        currentpage: 1,
        maxpage: Math.ceil(initial[i].length/this.state.showcount)
      }
    })
    initial = []

    iter.forEach((tab, i) => {
      var temp = this.getStories(tab, 1, result[tab])
      initial.push(temp)  
    })
     initial = await Promise.all(initial)
    
    iter.forEach((tab, i) => {
      result[tab.slice(0, -2)] = [initial[i]]
    })

    this.setState({
      ...result, 
      show: [...result['topstories'][0]]
    })
  }

  async getStoryIds (tab) {
    var req = await fetch(`https://hacker-news.firebaseio.com/v0/${tab.slice(0, -2)}.json?print=pretty`)
    return req.json()
  }

  async getStories (tab, page, arr) { // Takes tab & page or arr
    if (!page && !arr) {
      console.log('getStories is not properly called')
      return
    }
    
    if (arr === undefined) arr = this.state[tab]
    
    if (page !== null) arr = arr.slice(page-1, page * this.state.showcount)
    
    var arrProm = arr.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`))
    var promiseArr = await Promise.all(arrProm.map(p => p.catch(e => e)))
    return await Promise.all(promiseArr.map(x => x.json()))
  }

  async managePageStory (tab, pageNo) {
    //console.log(tab, pageNo, 'this was called')
    var start = (pageNo-1)*this.state.showcount
    var end = pageNo *this.state.showcount
    var tocheck = this.state[tab]
    var toget = []
    for (let i = start; i < end; i++) { // Good chance of dealing with a sparse array here
      if (!Boolean(tocheck[i])) toget.push(this.state[`${tab}ID`][i])
    }
    // console.log(toget, 'loggin toget', pageNo, tab)
    var stories = await this.getStories(tab, null, toget)
    this.setPageStory(tab, pageNo, stories)
  }

  setPageStory (tab, page, arr) {
    var newArr = this.state[tab]
    newArr[page-1] = arr
    this.setState({
      [tab]: [...newArr],
      [`${tab}page`]: {
        ...this.state[`${tab}page`],
        currentpage: page
      }
    })
  }

  tabswitch (tab) {
    this.setState({
      show: this.state[tab][this.state[`${tab}page`].currentpage - 1]
    })
  }

  pageChange(tab, page) {
    if (this.state[tab][page -1] !== undefined) {
      return this.setState({
        [`${tab}page`]: {
          ...this.state[`${tab}page`],
          currentpage: page
        }
      })
    }
    return this.managePageStory(tab, page)
  }

  toggleModal () {
    this.setState({
      modal: !this.state.modal
    })
  }

  onSignin (loggedin, user) {
    this.setState({
      loggedin,
      user
    })
  }

  async onSignout () {
    try{
      var res = await Axios.get('api/user/logout')
    } catch (e) {
      return  
    }
    return this.setState({
      loggedin: false,
      user: ''
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Route path="/"  render={props => <Header {...props} data={this.state}
            getStoryIds={this.getStoryIds} pageChange={this.pageChange}
            tabswitch={this.tabswitch} toggleModal={this.toggleModal} onSignout={this.onSignout}/>} />
          
          <Switch>
            <Route path="/story/:id" render={props => <Storypage {...props} 
              data={this.state} toggleModal={this.toggleModal} 
              onSignin={this.onSignin} onSignout={this.onSignout}/>} />

            <Route path="/createpost" render={props => <Createpost {...props} 
              data={this.state} toggleModal={this.toggleModal} 
              onSignin={this.onSignin} onSignout={this.onSignout}/>} />
          
            <Route path="/" render={props => <Pagecontent {...props} 
              data={this.state} getStories={this.getStories} 
              pageChange={this.pageChange} toggleModal={this.toggleModal}
              onSignin={this.onSignin} onSignout={this.onSignout} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
