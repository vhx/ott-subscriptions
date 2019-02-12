import React from 'react'

const TableRow = (props)=> {

  return (
    <tr>
      <td>{props.subscription.customer.email}</td>
      <td>{props.subscription.product.name}</td>
      <td>{props.subscription.subscribed_at}</td>
    </tr>
  )

}

export default TableRow
