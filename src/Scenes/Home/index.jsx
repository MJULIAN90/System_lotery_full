import React from "react";
import Admin from "../Admin";
import Information from "../Information";
import NavBar from "../NavBar";
import Publish from "../Publish";
import User from "../User";
import Footer from "../Footer";
import { home } from "../../Assets/style";
import useLoteryMethods from "../../Hooks/useLoteryMethods";

const Home = () => {
  const hook = useLoteryMethods();
  const {
    isOwner,
  } = hook;

  return (
    <>
      <div style={home.navBar}>{isOwner ? <Admin {...hook}/> : <NavBar {...hook}/>}</div>

      <div style={home.body}>
        <div >
          <User {...hook} />
        </div>
        <div >
          <Information {...hook}/>
        </div>
        <div >
          <Publish {...hook}/>
        </div>
        
        <div style={{ backgroundColor: "#198754", height: 100, position: 'absolute', bottom: 0,left:0, width: "100%", boxShadow: '-10px -6px 5px black' }}>
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Home;
