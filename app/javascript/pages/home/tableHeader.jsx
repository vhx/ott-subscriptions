import React, { Component } from 'react';
import TableBody from './tableBody';

class TableHeader extends Component {

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Pagination</th>
            </tr>
            <TableBody/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableHeader
