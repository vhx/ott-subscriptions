import React, { Component } from 'react';

class Searchbar extends Component {

  render() {
    return (
      <div className="searchbar-container">
        <form>
          <input type="text" name="name" placeholder="Search by name or email"/>
        </form>
      </div>
    )
  }
}

  export default Searchbar
