import React from "react";
import { Link } from "react-router-dom";
import '../LogoFrequency/LogoFrequency.scss'


const LogoFrequency = ({sizefont = "1.3rem"}) => {

    return(
            <Link to="/" className="LogoFrequency" style={{fontSize: sizefont}}>FREQUENCY</Link>
    );
};

export default LogoFrequency;