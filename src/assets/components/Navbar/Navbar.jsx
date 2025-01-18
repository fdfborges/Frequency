import React from "react";
import {useNavigate} from 'react-router-dom'
import './Navbar.scss';
import Button from "../Variables/Button/Button";
import LogoFrequency from "../LogoFrequency/LogoFrequency";

const Navbar = () => {
    
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/Login')
    };

    return(
        <nav>
            <div><LogoFrequency /></div>
            <div><Button onClick={goToLogin} label={"Entrar"}/></div>
        </nav>
    )
}

export default Navbar;