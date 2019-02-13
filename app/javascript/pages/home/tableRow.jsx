import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const TableRow = (props)=> {

  return (
    <tr>
      <td><div>{props.subscription.customer.email}</div><div className="mobile-product">{props.subscription.product.name}</div></td>
      <td className="column">{props.subscription.product.name}</td>
      <td><Moment diff={props.subscription.subscribed_at} unit="days">{moment()}</Moment> days ago</td>
    </tr>
  )

}

export default TableRow
