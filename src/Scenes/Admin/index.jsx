import React from 'react';
import { Button } from "react-bootstrap";
import useAlerts from "../../Hooks/useAlerts";
import { images } from '../../Assets'

const Admin = (props) => {
  const { 
    balanceEtherContract,
    balanceTokenContract,
    amountBalanceReward,
    getWinner
  } = props;
  const { alert } = useAlerts();

  const getWinnerStatus = async () => {
    let event = await getWinner();

    alert(event.message, event.type);
  }

  return (
    <div style={{gridTemplateColumns: "1fr 2fr 1fr",display: "grid",  width: "100%"}}>
      <img src={images.logo} height={140} width={140} alt='ERROR'/>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

        <Button variant="primary" onClick={getWinnerStatus} style={{ width: 120, height: 40, marginTop: 20, 
        
        }}>Get Winner</Button>
      </div>
      

      <div style={{ fontSize: 12, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div>Balance Contract: {balanceEtherContract} ETH</div>
        <div>Tokens Contract: {balanceTokenContract} LR</div>
        <div>Total reward: {amountBalanceReward} LR</div>

      </div>

    </div>
  )
}

export default Admin;