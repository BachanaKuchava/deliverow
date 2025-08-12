import React from "react";
import './about.scss';
import Operation from "../../components/operation/Operation";
import AboutComponent1 from "./aboutComponents1/AboutComponent1";
import AboutTeam from "./aboutTeam/AboutTeam";

function About() {
    return ( <>
    
    <AboutComponent1 />
    <Operation />
    {/* <AboutTeam /> */}
    </> );
}

export default About;