import React from 'react';
import { Button } from "react-bootstrap";
import useAlerts from "../../Hooks/useAlerts";
import { images } from '../../Assets'
import styles from './styles';

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
    <div style={styles.container}>
      <img src={images.logo} height={140} width={140} alt='ERROR' />

      <div >
      </div>

      <div style={styles.containerText}>
        <div >Balance Contract: {balanceEtherContract} ETH</div>
        <div>Tokens Contract: {balanceTokenContract} LR</div>
        <div>Total reward: {amountBalanceReward} LR</div>
        <Button onClick={getWinnerStatus} style={styles.containerButton}>Get Winner</Button>


      </div>
    </div>
  )
}

export default Admin;