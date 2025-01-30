import { useEffect, useState } from "react";
import "../Functionality/Functionality.scss";

const Functionality = () => {
    const [baseTime, setBaseTime] = useState(25 * 60); // Tempo padrão: 25 minutos
    const [timeLeft, setTimeLeft] = useState(baseTime);
    const [isRunning, setIsRunning] = useState(false);

    const BtnControl = document.querySelectorAll(".BtnFunctionality");
    
    BtnControl.forEach(botao => {
        botao.addEventListener("click", () => {
            BtnControl.forEach(BtnFunctionality => BtnFunctionality.classList.remove("ActiveBtnSelector"));
            botao.classList.add("ActiveBtnSelector");
        });
    });

    useEffect(() => {
        setTimeLeft(baseTime);
    }, [baseTime]);

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);

            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleTimeChange = (newTime) => {
        setIsRunning(false); 
        setBaseTime(newTime);
    };

    return (
        <div className="container">
            <div className='left'>
                <h1>Esquerda</h1>
            </div>

            <div className='right'>
                <div className="background">
                    <span>Tarefa: Estudar</span>
                    <div className='containerButtonsControl'>
                        <button 
                            className='BtnFunctionality' 
                            onClick={() => handleTimeChange(25 * 60)}
                        >
                            Pomodoro
                        </button>
                        <button 
                            className='BtnFunctionality' 
                            onClick={() => handleTimeChange(5 * 60)}
                        >
                            Pausa Curta
                        </button>
                        <button 
                            className='BtnFunctionality' 
                            onClick={() => handleTimeChange(15 * 60)}
                        >
                            Pausa Longa
                        </button>
                    </div>
                    <span className='counter'>{formatTime(timeLeft)}</span>
                    <button 
                        className={`BTN-Comecar ${isRunning ? "ActiveBtnCounter" : ""}`}
                        onClick={() => setIsRunning(prev => !prev)}
                    >
                        {isRunning ? "PAUSAR" : "COMEÇAR"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Functionality;
