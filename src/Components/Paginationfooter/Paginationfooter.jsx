import React, { Component } from 'react'
import { Pagination, PageControl, PageList, Page, PageLink, PageEllipsis } from 'bloomer'

import './paginationfooter.css'
export default class Paginationfooter extends Component {
  handlePage (page) {
    this.props.pageChange(this.props.tab, page)
  }

  render () {
    var { currentpage, maxpage } = this.props
    var first = currentpage === 1
    var second = currentpage === 2
    var lastbutone = currentpage === maxpage - 1
    var last = currentpage === maxpage
    return (
      <Pagination>
        <PageControl isHidden={first} onClick={() => this.handlePage(currentpage - 1)}>
          Previous
        </PageControl>
        <PageControl isNext isHidden={last} onClick={() => this.handlePage(currentpage + 1)}>
          Next
        </PageControl>
        <PageList>
          <Page isHidden={first || second} onClick={() => this.handlePage(1)}>
            <PageLink>1</PageLink></Page>
          <Page isHidden={first || second}><PageEllipsis /></Page>
          <Page isHidden={first} onClick={() => this.handlePage(currentpage - 1)}>
            <PageLink>{currentpage - 1}</PageLink></Page>
          <Page><PageLink isCurrent>{currentpage}</PageLink></Page>
          <Page isHidden={last} onClick={() => this.handlePage(currentpage + 1)}>
            <PageLink >{currentpage + 1}</PageLink></Page>
          <Page isHidden={last || lastbutone}><PageEllipsis /></Page>
          <Page isHidden={last || lastbutone}><PageLink
            onClick={() => this.handlePage(maxpage)}>{maxpage}</PageLink></Page>
        </PageList>
      </Pagination>
    )
  }
}
