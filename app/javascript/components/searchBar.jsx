import React, { Component } from 'react';
import './searchBar.scss'
import searchIcon from '../../assets/images/search-mono.svg';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: null
    }
  }

  handleChange = (e) => {
    this.setState ({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.search(this.state.searchString);
  }

  render() {
    return (
      <div className='searchBarWrapper'>
        <form className='searchForm' onSubmit={this.handleSubmit}>
          <input className='searchInput' type='text' id='searchString' onChange={this.handleChange}  placeholder='Search by email or product or subscription'/>
          <button className='searchBtn'>
            <img src={searchIcon} alt="A search icon"/>
          </button>
        </form>
      </div>
    )
  }
}

export default SearchBar;