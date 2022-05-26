import React from "react";
import { Form, Button } from "react-bootstrap";
import useAlerts from "../../Hooks/useAlerts";
import { images } from '../../Assets'

const User = (props) => {
  const {
    buyTokens,
    buyTickets,
    withdrawEthers,
    balanceToken,
    totalTickets,
  } = props;
  const { alert } = useAlerts();

  const buyTokensFunction = async (e) => {
    e.preventDefault();
    let amount = parseInt(e.target[0].value);
    let event = await buyTokens(amount);

    e.target[0].value = "";
    alert(event.message, event.type);
  }

  const buyTicketsFunction = async (e) => {
    e.preventDefault();
    let amount = parseInt(e.target[0].value);
    let event = await buyTickets(amount);

    e.target[0].value = "";
    alert(event.message, event.type);
  }

  const withdrawalFunction = async (e) => {
    e.preventDefault();
    let amount = parseInt(e.target[0].value);
    let event = await withdrawEthers(amount);

    e.target[0].value = "";
    alert(event.message, event.type);
  }
  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",marginBottom:20, marginTop:20 }}>
      
      <div style={{display:"flex", margin: 10, marginLeft:10, fontWeight:"bold", fontSize:16, marginBottom:40,  position:"relative"}}>
        <img src={images.banner} height={85} width={300} alt='error' style={{ position: "absolute", left: -65, top: -25, zIndex:-1, }} />
        <div style={{ marginRight: 20, color: "#522107"}}>Tickets: {totalTickets}</div>
        <div style={{ color: "#522107" }}>Tokens: {balanceToken}</div>
      </div>

      <Form onSubmit={buyTokensFunction} className="col-6  mb-5" >
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label style={{fontWeight:"bold"}}>Buy Tokens</Form.Label>
          <Form.Control type="number" placeholder="Quantity" />
        </Form.Group>
        <Button variant="success" type="submit">
          Buy
        </Button>
      </Form>

      <Form onSubmit={buyTicketsFunction} className="col-6 mb-5" >
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>Buy Tickets</Form.Label>
          <Form.Control type="number" placeholder="Quantity" />
        </Form.Group>

        <Button variant="success" type="submit" >
          Buy
        </Button>
      </Form>

      <Form onSubmit={withdrawalFunction} className="col-6 mb-5"  >
        <Form.Group className="mb-3 col-12 text-wrap" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>Withdrawal</Form.Label>
          <Form.Control type="number" placeholder="Quantity" />
        </Form.Group>
        <Button variant="success" type="submit">
          Withdrawal
        </Button>
      </Form>

    </div>
  );
};

export default User;
