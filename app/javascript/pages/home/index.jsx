import React from 'react'
import ReactDOM from 'react-dom'
import Subscriptions from './subscriptions';

const Index = () => (
  <Subscriptions/>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index/>,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Index
