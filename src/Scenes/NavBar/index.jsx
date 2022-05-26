import React from 'react';
import { images } from '../../Assets'

const NavBar = (props) => {
  const {
    balanceEther,
    addressAccount,
    totalReward
  } = props;

  return (
  <div>
    <div style={{ display: 'flex', position: 'absolute', left: 10, top: -10,  }}>
      <img src={images.logo} height={140} width={140} alt='error'/>
    </div>
        <div> Address Account: {addressAccount}</div>
        <div> Balance: {balanceEther} ETH</div>
        <div> Total Available Reward {totalReward}</div>
  </div>)

}

export default NavBar;