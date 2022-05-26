import React from 'react';
import { Button } from "react-bootstrap";
import RenderTickets from './Components/RenderTickets';
import useAlerts from "../../Hooks/useAlerts";

const Publish = (props) => {
  const {
    tickets,
    listTickets,
    } = props;
  const { alert } = useAlerts();

  const checkTickets = async () => {
    let response = await listTickets()
    alert(response.message, response.type);
  }

  return (
    <div style={{marginTop:30}}>
      <Button variant="success" onClick={checkTickets} style={{marginBottom:20}}> See Tickets</Button>
      <div>{tickets.length > 0 ? <RenderTickets tickets={tickets}/> : null }</div>
    </div>
  );
}

export default Publish;