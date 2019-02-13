import React, { Component } from 'react';
import TableBody from './tableBody';
import Pagination from './pagination';

class TableHeader extends Component {

  render() {
    return (
      <table>
        <tbody>
          <tr className="row">
            <th className="headers">Customer</th>
            <th className="headers column">Product</th>
            <th className="headers"><Pagination/></th>
          </tr>
          <TableBody/>
        </tbody>
      </table>
    )
  }
}

export default TableHeader
