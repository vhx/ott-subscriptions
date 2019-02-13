import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const TableRow = (props)=> {

  return (
    <tr>
      <td>{props.subscription.customer.email}</td>
      <td>{props.subscription.product.name}</td>
      <td><Moment diff={props.subscription.subscribed_at} unit="days">{moment()}</Moment> days ago</td>
    </tr>
  )

}

export default TableRow
