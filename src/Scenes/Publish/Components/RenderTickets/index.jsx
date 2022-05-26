import React from 'react'
import Ticket from '../../../../Components/Ticket';

const RenderTickets = ({ tickets }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <div style={{ overflowY: "auto", overflowX: 'hidden', width: "120px", height: "400px" }}>
        {tickets.map((ticket) =>
          <Ticket sizeW={100} mleft={-72} sizeH={60} nameTicket={ticket} mlname={35} mtname={28}/>
        )}
      </div>
    </div>
  )
}

export default RenderTickets;