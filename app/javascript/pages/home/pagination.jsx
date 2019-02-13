import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Pagination extends Component {

  render() {
    return(
      <div className="text-center">
         &lt;&lt; {this.props.current_page} of {this.props.total_pages}  &gt;&gt;
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    current_page: state.current_page,
    total_pages: state.total_pages
  }
}


export default connect(mapStateToProps)(Pagination)
