import React, {
  Component
} from 'react';

class Subscriptions extends Component {
  state = {
    subscriptions: {}
  }

  renderSubscriptions = () => {
    if (this.state.subscriptions.length > 1) {
      return this.state.subscriptions.map(s=><div key={s.id}>{s.customer.email}</div>)
    }
  }

  render() {
    return ( <div> {
      this.renderSubscriptions()
    } </div>)
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


  export default Subscriptions
