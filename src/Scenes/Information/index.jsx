import React from "react";
import { Carousel } from "react-bootstrap";
import { images } from '../../Assets'
import Ticket from "../../Components/Ticket";

const Information = (props) => {
  const {
    bringWinnerState,
    totalReward
  } = props;

  return <div style={{display:"flex", justifyContent: "center", alignItems: "center",  height:"100%", flexDirection:"column", position:"relative" }}>

    <div style={{position:"absolute", top:50, fontWeight:"bold"}}> Total available reward {totalReward}</div>
    
    {bringWinnerState === 0 ?
    <div style={{marginTop: -60, marginBottom:30}}>
    <Ticket sizeW={250} mleft={-180} sizeH={150} nameTicket={"Waiting for a winner"} mlname={70} mtname={75} sizeText={20} /> 
    </div> :
    <div style={{position:"absolute", top:112}}>
      <Ticket sizeW={250} mleft={-165} sizeH={150} nameTicket={bringWinnerState} mlname={90} mtname={75} sizeText={32}/> 
    </div>}

    <Carousel style={{ width: 250, height: 250, top: 120, }}>
      <Carousel.Item interval={1000} style={{ height: 250 }}>
        <img
          className="d-block w-100 h-100"
          src={images.logoBlack}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100 h-100"
          src={images.lotery1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{height:250}}>
        <img
          className="d-block w-100 h-100"
          src={images.lotery3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: 250 }}>
        <img
          className="d-block w-100 h-100"
          src={images.lotery2}
          alt="Four slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: 250 }}>
        <img
          className="d-block w-100 h-100"
          src={images.lotery4}
          alt="Faiv slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>;
};

export default Information;