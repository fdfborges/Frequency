import React from "react";
import './Navbar.scss';
import Button from "../Variables/Button/Button";
import LogoFrequency from "../LogoFrequency/LogoFrequency";

const Navbar = () => {
    return(
        <nav>
            <div><LogoFrequency /></div>
            <div><Button label={"Entrar"}/></div>
        </nav>
    )
}

export default Navbar;