import { useEffect, useState } from "react";
import "../Functionality/Functionality.scss";
import { format } from "date-fns";
import CheckPng from './assets/Check.png'; // Importando a imagem corretamente

const Functionality = () => {
    const [baseTime, setBaseTime] = useState(25 * 60); // Tempo padrão: 25 minutos
    const [timeLeft, setTimeLeft] = useState(baseTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTimeLeft(baseTime);
    }, [baseTime]);

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
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

    const OfensiveTotal = () => {
        const Today = new Date();
        const dayOfWeek = format(Today, "EEEE");
        console.log(dayOfWeek);

        const Ofensive = (dayOfWeek) => {
            const CheckSun = document.getElementById("CheckSun");
            const CheckMon = document.getElementById("CheckMon");
            const CheckTue = document.getElementById("CheckTue");
            const CheckWed = document.getElementById("CheckWed");
            const CheckThu = document.getElementById("CheckThu");
            const CheckFri = document.getElementById("CheckFri");
            const CheckSat = document.getElementById("CheckSat");

            if (dayOfWeek === "Sunday") {
                CheckSun.src = CheckPng;
            } else if (dayOfWeek === "Monday") {
                CheckMon.src = CheckPng;
            } else if (dayOfWeek === "Tuesday") {
                CheckTue.src = CheckPng;
            } else if (dayOfWeek === "Wednesday") {
                CheckWed.src = CheckPng;
            } else if (dayOfWeek === "Thursday") {
                CheckThu.src = CheckPng;
            } else if (dayOfWeek === "Friday") {
                CheckFri.src = CheckPng;
            } else if (dayOfWeek === "Saturday") {
                CheckSat.src = CheckPng;
            }
        };

        Ofensive(dayOfWeek);
    };

    return (
        <div className="container">
            <div className="left">
                <div className="containerDashboard">
                    <span className="TitleDaysOfensive">Dias de Ofensiva</span>
                    <div className="ContainerOfensive">
                        <div className="ContainerTitleAndCheck">
                            <span>Dom</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckSat" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Seg</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckSun" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Ter</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckMon" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Qua</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckTue" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Qui</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckWed" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Sex</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckThu" src="" alt="" />
                            </div>
                        </div>
                        <div className="ContainerTitleAndCheck">
                            <span>Sab</span>
                            <div className="CheckOfensive">
                                <img className="CheckSeg" id="CheckFri" src="" alt="" />
                            </div>
                        </div>
                        {/* Outros dias... */}
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="background">
                    <span>Tarefa: Estudar</span>
                    <div className="containerButtonsControl">
                        <button
                            className="BtnFunctionality"
                            onClick={() => handleTimeChange(25 * 60)}
                        >
                            Pomodoro
                        </button>
                        <button
                            className="BtnFunctionality"
                            onClick={() => handleTimeChange(5 * 60)}
                        >
                            Pausa Curta
                        </button>
                        <button
                            className="BtnFunctionality"
                            onClick={() => handleTimeChange(15 * 60)}
                        >
                            Pausa Longa
                        </button>
                    </div>
                    <span className="counter">{formatTime(timeLeft)}</span>
                    <button
                        className={`BTN-Comecar ${isRunning ? "ActiveBtnCounter" : ""}`}
                        onClick={() => {
                            setIsRunning((prev) => !prev);
                            OfensiveTotal();  // Chama a função OfensiveTotal aqui
                        }}
                    >
                        {isRunning ? "PAUSAR" : "COMEÇAR"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Functionality;
