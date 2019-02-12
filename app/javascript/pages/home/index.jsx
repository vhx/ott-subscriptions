import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Header from './header';
import TableHeader from './tableHeader';
import Searchbar from './searchbar'

const Index = () => (
  <Fragment>
    <Header/>
    <Searchbar/>
    <TableHeader/>

  </Fragment>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index/>,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Index
