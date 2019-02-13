import React, { Component } from 'react';
import TableBody from './tableBody';

class TableHeader extends Component {

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr className="row">
              <th className="headers">Customer</th>
              <th className="headers">Product</th>
              <th className="headers">Pagination</th>
            </tr>
            <TableBody/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableHeader
