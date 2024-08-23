import React from "react";
import i3 from "../img/3.jpg"
import i4 from "../img/4.jpg"
import i6 from "../img/6.jpg"

import {Bounce} from "react-swift-reveal";
let Landingpage=()=>{
    return(
        <React.Fragment>
       <Bounce>
       <div className="container-fluid m-2 bx overflow-auto mb-500" >
            <img src={i3} width={400} alt="not found" className="float-start image-fluid"/>
            <h4 className="bona-nova-sc-bold text-danger text-center">Why to choose</h4>
            <br/>
            <br/>
            <ul class="a">
  <li>All-in-one vendor management for streamlined operations</li>
  <li>Intuitive interface for effortless vendor navigation</li>
  <li>Scalable platform tailored to growing business needs</li>
</ul>


            </div>
       </Bounce>
       <Bounce>
       <div className="container-fluid m-2 bx overflow-auto" >
            <img src={i4} width={400} alt="not found" className="float-end image-fluid"/>
            <h4 className="bona-nova-sc-bold text-danger text-center">Grow Together</h4>
            <br/>
            <br/>
            <ul class="a">
  <li>Collaborative platform fostering mutual vendor growth</li>
  <li>Shared success through collective vendor network synergy</li>
  <li>Empowering vendors to thrive and expand together</li>
</ul>

            </div>
       </Bounce>
       <Bounce>
       <div className="container-fluid m-2 bx overflow-auto" >
            <img src={i6} width={400} alt="not found" className="float-start image-fluid"/>
            <h4 className="bona-nova-sc-bold text-danger text-center">Policy</h4>
            <br/>
            <br/>
            
            <ul class="a">
  <li>Robust data protection ensuring vendor information security</li>
  <li>Strict privacy controls safeguarding user confidentiality</li>
  <li>Transparent policies with complete data handling clarity</li>
</ul>

            </div>
       </Bounce>
           

        </React.Fragment>
    )
}
export default Landingpage