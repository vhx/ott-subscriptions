import React, { Component, Fragment } from 'react';
import TableRow from './tableRow';

class TableBody extends Component {
  state = {
    subscriptions: {}
  }

  renderSubscriptions = () => {
    if (this.state.subscriptions.length > 1) {
      return this.state.subscriptions.map(subscription=><TableRow key={subscription.id} subscription={subscription}/>)
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
        this.setState({
          subscriptions: json
        })
      })
  }

}


  export default TableBody
