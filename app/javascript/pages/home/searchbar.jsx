import React, { Component } from 'react';
import SearchImage from 'images/search-mono.svg'


class Searchbar extends Component {

  inputStyle = {
    backgroundImage: "url(" + { SearchImage } + ")"
  }

  render() {
    return (
      <div className="searchbar-container">
        <form>
          <input style = { this.inputStyle }type="text" name="name" placeholder="Search by name or email"/>
        </form>
      </div>
    )
  }
}

  export default Searchbar
