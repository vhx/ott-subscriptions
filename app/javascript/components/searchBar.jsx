import React, { Component } from 'react';
import './searchBar.scss'
import searchIcon from '../../assets/images/search-mono.svg';

class SearchBar extends Component {
  state = {
    searchString: null
  }
  render() {
    return (
      <div className='searchBarWrapper'>
        <form className='searchForm'>
          <input className='searchInput' type='text' id='searchString' onChange={this.handleChange}  placeholder='Search by name or email'/>
          <button className='searchBtn'>
            <img src={searchIcon} alt="A search icon"/>
          </button>
        </form>
      </div>
    )
  }
}

export default SearchBar;