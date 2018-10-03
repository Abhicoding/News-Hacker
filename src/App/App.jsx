import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from '../Components/Header/Header.jsx'
import Pagecontent from '../Components/Pagecontent/Pagecontent.jsx'
import Storypage from '../Components/Storypage/Storypage.jsx'
import Axios from 'axios';

class App extends Component {
  constructor () {
    super()
    this.state = {
      showcount: 10,
      newstories : [],
      topstories: [],
      beststories: [],
      nhstories: [],
      newstoriesID: [],
      topstoriesID: [],
      beststoriesID: [],
      nhstoriesID: [],
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
      nhstoriespage: {
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
    this.auth = this.auth.bind(this)
    this.changeUserStatus = this.changeUserStatus.bind(this)
  }

  componentWillMount () {
    this.initialize()
  }

  async initialize () {
    var initial = [];
    var result = {};
    var iter = ['topstoriesID', 'beststoriesID', 'newstoriesID', 'nhstoriesID']

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

    var res = await this.auth()
    if (res) {
      result.user = res
      result.loggedin = true
    }

    this.setState({
      ...result, 
      show: [...result['topstories'][0]]
    })
  }

  async auth () {
    try {
      return await Axios.get('/api/user/auth') 
    } catch (e) {
      return false
    }
  }

  async getStoryIds (tab) {
    var req = await Axios.get(`/api/ext/storyids/${tab.slice(0, -2)}`)
    return req.data
  }

  async getStories (tab, page, arr) { // Takes tab & page or arr
    if (!page && !arr) {
      return
    }
    
    if (arr === undefined) arr = this.state[tab]
    
    if (page !== null) arr = arr.slice(page-1, page * this.state.showcount)

    var arrProm = arr.map(id => Axios.get(`/api/ext/story/${tab}/${id}`))

    var promiseArr = await Promise.all(arrProm.map(p => p.catch(e => e)))

    return promiseArr.map(i => i.data)
  }

  async managePageStory (tab, pageNo) {
    var start = (pageNo-1)*this.state.showcount
    var end = pageNo *this.state.showcount
    var tocheck = this.state[tab]
    var toget = []
    for (let i = start; i < end; i++) { // Good chance of dealing with a sparse array here
      if (!Boolean(tocheck[i])) toget.push(this.state[`${tab}ID`][i])
    }
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

  changeUserStatus () {
    return this.setState({
      loggedin: false,
      user: ''
    })
  }

  async onSignout () {
    try{
      await Axios.get('api/user/logout')
    } catch (e) {
      return  
    }
    return this.changeUserStatus()
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
