import React, { Component } from 'react';
import SearchImage from 'images/search-mono.svg'


class Searchbar extends Component {

  // inputStyle = {
  //   backgroundImage: "url(" + { SearchImage } + ")"
  // }
  state = {
    search: ''
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.search()
  }

  // search = () => {
  //   console.log('hi')
  // }

  search = () => {
    fetch('http:localhost:3000/search')
  }

  render() {
    return (
      <div className="searchbar-container">
        <form onSubmit={()=>this.handleSubmit(event)}>
          <input onChange={()=>this.handleChange(event)} value={this.state.search} type="text" name="name" placeholder="Search by name or email"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

  export default Searchbar
