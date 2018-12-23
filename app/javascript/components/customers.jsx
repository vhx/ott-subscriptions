import React from 'react';
import { connect } from 'react-redux';
import './customers.scss'

const Customers = ({ customers, page, pages }) => {
  const customerList = customers.map(customer =>{
    return(
      <tr key={customer.id}>
        <td>{customer.email}</td>
        <td>{customer.product_name}</td>
        <td>{customer.billing_type}</td>
      </tr>
    )  
  })

  const smallList = customers.map(customer =>{
    return(
      <div key={customer.id} className='smRow'>
        <div className='smCol1'>
          <div className='smColFirstEle'>{customer.email}</div>
          <div>{customer.product_name}</div>
        </div>
        <div className='smCol2'>{customer.billing_type}</div>
      </div>
    )
  })

  return (
    <div className='customersWrapper'>
      
      <table className='largeTable'>
        <thead>
          <tr>
            <th>Customers</th>
            <th>Products</th>
            <th>{page} of {pages}</th>
          </tr>
        </thead>
        <tbody>
          {customerList}
        </tbody>
      </table>

      <div className='smallTable'>
        {smallList}  
      </div>

    </div>
  )
};

export default (Customers);