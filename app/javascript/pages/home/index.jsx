import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Subscriptions from './subscriptions';

const Index = props => (
  <Subscriptions/>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Index
