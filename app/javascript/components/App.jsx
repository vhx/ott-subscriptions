import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../actions/subActions';

import CustomerHeader from './customerHeader';
import SearchBar from './searchBar';
import Customers from './customers';
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.props.fetchSubscriptions();
    
  }

  render() {
    console.log(this.props)

    return (
      <div className='appContainer'>
        <CustomerHeader />
        <SearchBar />
        <Customers customers={this.props.customers} 
                   page={this.props.page} 
                   pages={this.props.pages}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    page: state.page,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubscriptions: () => dispatch(fetchSubscriptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);