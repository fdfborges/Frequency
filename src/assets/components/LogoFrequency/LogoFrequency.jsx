import React from "react";
import '../LogoFrequency/LogoFrequency.scss'


const LogoFrequency = ({sizefont = "1.3rem"}) => {
    return(
        <div className="LogoFrequency" style={{ fontSize: sizefont }}>
            <p>FREQUENCY</p>
        </div>
    );
};

export default LogoFrequency;