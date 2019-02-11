import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Subscriptions extends Component  {
  state = {
    customers: {}
  }

  render() {
      return (
        <div>hi</div>
      )
    }

  componentDidMount(){
    this.fetchCustomers()
  }

  fetchCustomers = () => {
    fetch('http:localhost:3000/subscriptions')
    .then(r=>r.json())
    .then(console.log)
  }

}


export default Subscriptions
