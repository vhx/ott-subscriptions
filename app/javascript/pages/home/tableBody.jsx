import React, { Component, Fragment } from 'react';
import TableRow from './tableRow';
import { connect } from 'react-redux'

class TableBody extends Component {
  // state = {
  //   subscriptions: {}
  // }

  renderSubscriptions = () => {
    if (this.props.subscriptions.length > 1) {
      return this.props.subscriptions.map(subscription=><TableRow key={subscription.id} subscription={subscription}/>)
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderSubscriptions()}
      </Fragment>
    )
  }

  componentDidMount() {
    this.fetchCustomers()
  }

  fetchCustomers = () => {
    fetch('http:localhost:3000/subscriptions')
      .then(r => r.json())
      .then(json => {
        this.props.updateSubscriptions(json)
      })
  }

}

function mapStateToProps(state){
  return {
    subscriptions: state.subscriptions
  }
}

function mapDispatchToState(dispatch){
  return {
    updateSubscriptions: (subscriptions)=> dispatch({
      type: "UPDATE_SUBSCRIPTIONS",
      payload: subscriptions
    })
  }
}

  export default connect(mapStateToProps, mapDispatchToState)(TableBody)
