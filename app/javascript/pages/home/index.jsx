import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from '../../components/header.jsx';

const Index = props => (
  <Header
  	title="CUSTOMERS"
  	desc="Most recent activity from your entire audience"
  	img={require('../../../assets/images/member.svg')} 
  />
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