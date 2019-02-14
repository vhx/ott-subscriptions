import React, { Component } from 'react';
import SearchImage from 'images/search-mono.svg';
import { connect } from 'react-redux';


class Searchbar extends Component {

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


  search = () => {
    fetch(`http:localhost:3000/search?searchterm=`+`${this.state.search}`)
    .then(r=>r.json())
    .then(json=>this.props.updateSubscriptions(json))
  }

  render() {
    return (
      <div className="searchbar-container">
        <form onSubmit={()=>this.handleSubmit(event)}>
          <input id="field" onChange={()=>this.handleChange(event)} value={this.state.search} type="text" name="name" placeholder="Search by name or email"/>
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}

function mapDispatchToState(dispatch){
  return {
    updateSubscriptions: (json)=> dispatch({
      type: "UPDATE_SUBSCRIPTIONS",
      payload: json
    })
  }
}

export default connect(null, mapDispatchToState)(Searchbar)
