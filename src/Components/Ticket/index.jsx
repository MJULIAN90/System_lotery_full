import React from 'react'
import { images } from '../../Assets';
import styles from './styles';

const Ticket = ({ sizeW, mleft, sizeH, nameTicket, mlname, mtname, sizeText }) => {

    return (
        <div key={nameTicket} style={styles.container} >
            <div style={{ marginLeft: mlname, marginTop: mtname, fontWeight: 'bold', color: "#522107", fontSize: sizeText ? sizeText : 18, maxWidth:110 }}>
                {nameTicket}
            </div>
            <img src={images.ticket} alt="error" width={sizeW} height={sizeH} style={{ marginLeft: mleft, zIndex: -1 }} />
        </div>
    )
}

export default Ticket;