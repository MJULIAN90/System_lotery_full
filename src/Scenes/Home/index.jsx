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
        
        <div style={home.containerFooter}>
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Home;
