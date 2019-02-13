import React, { Component } from 'react';
import TableBody from './tableBody';
import Pagination from './pagination';

class TableHeader extends Component {

  render() {
    return (
      <table>
        <tbody>
          <tr className="row">
            <th id="customer-col" className="headers">Customer</th>
            <th id="product-col" className="headers column">Product</th>
            <th id="pagination-col" className="headers"><Pagination/></th>
          </tr>
          <TableBody/>
        </tbody>
      </table>
    )
  }
}

export default TableHeader
