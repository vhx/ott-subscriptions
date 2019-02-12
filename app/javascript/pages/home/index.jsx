import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Subscriptions from './subscriptions';
import Header from './header';

const Index = () => (
  <Fragment>
    <Header/>

  </Fragment>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index/>,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Index
