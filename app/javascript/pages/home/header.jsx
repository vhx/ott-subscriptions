import React from 'react';
import MemberImage from 'images/member.svg'

const Header = () => (
  <div className="header-container">
    <img className="customer-image"src={MemberImage} alt="icon of person"></img>
    <div>
      <div className="customers-header">CUSTOMERS</div>
      <div>Most recent activity from your entire audience</div>
    </div>
  </div>
)

export default Header
