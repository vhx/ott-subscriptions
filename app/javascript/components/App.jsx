import React, { Component } from 'react';
import CustomerHeader from './customerHeader';
import SearchBar from './searchBar';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../actions/subActions';
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

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    page: state.page,
    pages: state.pages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubscriptions: () => dispatch(fetchSubscriptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);