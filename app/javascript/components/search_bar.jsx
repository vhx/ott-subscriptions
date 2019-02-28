import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SearchBar extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		value: ''
  	};
  }

  handleChange(e) {
  	const current_input = e.target.value;
  	this.setState({
  		value: current_input
  	});
  }

  handleKeyPress(e) {
  	if (e.key === "Enter") {
  		return this.submit();
  	}
  }

  /**
   * Passes data in search bar to props submit function.
   */
  submit() {
  	const val = this.state.value;
  	return this.props.submit(val);
  }

  render() {
  	return(
  	  <div className="search-bar">
  	  	<input type="text" name="search-input" placeholder={this.props.placeholder} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
  	  	<button className="search-button" onClick={this.submit.bind(this)}>
  	  	  <FontAwesomeIcon icon="search" />
  	  	</button>
  	  </div>
  	);
  }
}

export default SearchBar;