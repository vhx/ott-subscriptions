import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from '../../components/header.jsx';
import SearchBar from '../../components/search_bar.jsx';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)


const Index = props => (
  <div>
	<Header
	  title="CUSTOMERS"
	  desc="Most recent activity from your entire audience"
	  img={require('../../../assets/images/member.svg')} 
	 />
	 <SearchBar placeholder="Search by email, product name or subscription type"/>
  </div>
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