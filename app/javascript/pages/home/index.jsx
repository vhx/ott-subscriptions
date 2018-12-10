import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../../components/App'

// const Index = props => (
//   <div>Hello {props.name}!</div>
// )

// Index.defaultProps = {
//   name: ''
// }

// Index.propTypes = {
//   name: PropTypes.string
// }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})


export default Index