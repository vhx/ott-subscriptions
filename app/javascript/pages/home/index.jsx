import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Index = props => (
  <div>Hello {props.name}!</div>
)

Index.defaultProps = {
  name: ''
}

Index.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})


export default Index