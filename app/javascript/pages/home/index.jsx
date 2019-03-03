import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from '../../components/header.jsx';
import SubscriptionsTable from '../../components/subscriptions_table.jsx';
import API from '../../client/api.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronRight, faAngleDoubleRight, faChevronLeft, faAngleDoubleLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { createStore } from 'redux';
import { Provider } from 'react-redux';


library.add(faSearch)
library.add(faChevronRight)
library.add(faAngleDoubleRight)
library.add(faChevronLeft)
library.add(faAngleDoubleLeft)
library.add(faSpinner)




const redux_state = {
	subscriptions_table: {
		table: {
			start_entry: 1,
			total_entries: 0,
		},
		data: {
			page: 1,
			total_pages: 0,
			subscriptions: [],
			last_query: ""
		},
		status: {
			buffering: false,
			cancelling: false
		}
	}
}

const reducer = function(state = redux_state, action) {
	const new_state = {...state};
	if (action.type === 'UPDATE_SUB_TABLE') {
		new_state.subscriptions_table = action.value;
	} else if (action.type === 'SET_BUFFERING') {
		new_state.subscriptions_table.status.buffering = action.value
	} else if (action.type === 'SET_CANCELLING') {
		new_state.subscriptions_table.status.cancelling = action.value
	}
	return new_state;
}
const store = createStore(reducer);


const Index = props => (
  <div className="index">
  	<div className="head">
		<Header
		  title="CUSTOMERS"
		  desc="Most recent activity from your entire audience"
		  img={require('../../../assets/images/member.svg')} 
		 />
		 <Provider store={store}>
		 	<SubscriptionsTable />
		 </Provider>
	</div>
	<div className="body">
	</div>
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