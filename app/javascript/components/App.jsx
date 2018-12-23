import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions, fetchPage, fetchSearch } from '../actions/subActions';

import CustomerHeader from './customerHeader';
import SearchBar from './searchBar';
import Customers from './customers';
import PaginationBar from './paginationBar';
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.props.fetchSubscriptions();
    
  }

  handlePageChange = (e, { activePage }) => {
    let goToPage = { activePage };
    let pageNum = goToPage.activePage;
    let pageString = pageNum.toString();
    this.props.fetchPage(pageString);
  }

  handleSearch = (searchString) => {
    // console.log(searchString);
    this.props.fetchSearch(searchString);
  }

  render() {
    console.log(this.props)
    return (
      <div className='appContainer'>
        <CustomerHeader />
        <SearchBar search={this.handleSearch}/>
        <Customers customers={this.props.customers} 
                   page={this.props.page} 
                   pages={this.props.pages}
        />
        <PaginationBar page={this.props.page}
                       pages={this.props.pages}
                       onPageChange={this.handlePageChange}

        />
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
    fetchSubscriptions: () => dispatch(fetchSubscriptions()),
    fetchPage: (pageNumber) => dispatch(fetchPage(pageNumber)),
    fetchSearch: (searchString) => dispatch(fetchSearch(searchString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);