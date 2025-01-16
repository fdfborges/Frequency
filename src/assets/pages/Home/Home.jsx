import React from "react";
import '../Home/Home.scss';
import { FaCirclePlay } from "react-icons/fa6";

import Lottie from 'lottie-react';
import AnimationTeste from '../Home/AnimationTeste.json';



const Home = () => {

    return (<div className="containerHome">
        <div className="containerHeader">
            <h1>Transforme seu Hábito de Estudar <br /> em uma jornada épica!</h1>
            <p>Acompanhe seus dias de estudo, desbloqueie conquistas e <strong>veja seu progresso decolar</strong>.</p>
        </div>

        <div className="buttonsCTA">
            <button className="buttonCTA">Comece Grátis</button>
            <button className="buttonCTA_Movie"><FaCirclePlay size={20}/> Assista o Vídeo</button>
            <Lottie className="AnimationLottie" animationData={AnimationTeste} loop={true} width={"1px"}  height={"1px"}/>
        </div>

        <div className="funcionalityPreview">
            
        </div>
    </div>
    )
};

export default Home;