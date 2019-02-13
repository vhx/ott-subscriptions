import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Pagination extends Component {

  handleClick = (propertyName) => {
    if (propertyName === 'next' && this.props.current_page < this.props.total_pages) {
      fetch(`http:localhost:3000/subscriptions?page=`+`${this.props.next_page}`)
      .then(r=>r.json())
      .then(json=>this.props.updateSubscriptions(json))

    } else if (propertyName=== 'previous' && this.props.current_page > 1) {
      fetch(`http:localhost:3000/subscriptions?page=`+`${this.props.prev_page}`)
      .then(r=>r.json())
      .then(json=>this.props.updateSubscriptions(json))
    }
  }

  render() {
    return(
      <div className="text-center">
         <span onClick={()=> this.handleClick("previous")} className="arrows">&lt;&lt;</span> {this.props.current_page} of {this.props.total_pages}  <span onClick={()=> this.handleClick("next")} className="arrows">&gt;&gt;</span>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    current_page: state.current_page,
    total_pages: state.total_pages,
    next_page: state.next_page,
    prev_page: state.prev_page,
    current_page: state.current_page
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


export default connect(mapStateToProps, mapDispatchToState)(Pagination)
