import React, { Component } from 'react';
import CustomerHeader from './customerHeader';
import SearchBar from './searchBar';
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className='appContainer'>
        <CustomerHeader />
        <SearchBar />
        
      </div>
    )
  }
}

export default App;