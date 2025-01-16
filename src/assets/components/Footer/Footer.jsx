import React from "react";
import '../Footer/Footer.scss';
import LogoFrequency from "../LogoFrequency/LogoFrequency";

const Footer = () =>{
    return(
        <div className="containerFooter">
            <LogoFrequency sizefont="2rem" />
            <p className="Directs">© 2024 All Rights Reserved.</p>
        </div>
    );
};

export default Footer;