import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const TableRow = (props)=> {

  return (
    <tr>
      <td><div>{props.subscription.relationships.customer.data.email}</div><div className="mobile-product">{props.subscription.relationships.product.data.name}</div></td>
      <td className="column">{props.subscription.relationships.product.data.name}</td>
      <td><Moment diff={props.subscription.attributes["subscribed-at"]} unit="days">{moment()}</Moment> days ago</td>
    </tr>
  )

}

export default TableRow
