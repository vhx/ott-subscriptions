import React from 'react';
import './customerHeader.scss';
import MemberIcon from '../../assets/images/member.svg';

const CustomerHeader = (props) => {
  return (
    <div className='headerWrapper'>
      <div className='memberIcon'>
        <img src={MemberIcon} alt="A member icon"/>
      </div>
      <div className='headerTitle'>
        <div className='activityTitle'> 
          Customer
        </div>
        <div className='activityMsg'>
          Most recent activity from your entire audience
        </div>
      </div>
    </div>
  )
};

export default CustomerHeader;