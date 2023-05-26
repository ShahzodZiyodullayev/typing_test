import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const testTime = 60;

function Timer({ countdownInitialTime, animation, calcResult, keyDown, bugArr, updateSum, textRef }) {
    const blurRef = useRef();
    const [countdown, setCountdown] = useState(countdownInitialTime);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(testTime);
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [WPM, setWPM] = useState(0);

    useEffect(() => {
        let countdownInterval = null;
        let timerInterval = null;

        if (isActive && countdown > 0) {
            countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (isActive && countdown === 0) {
            countdownInterval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft <= testTime) document.addEventListener("keydown", keyDown);
                    if (prevTimeLeft === 1) document.removeEventListener("keydown", keyDown);
                    if (prevTimeLeft === 0) {
                        clearInterval(countdownInterval);
                        clearInterval(timerInterval);
                        setIsTimedOut(true);
                        setIsActive(false);
                        setWPM(calcResult());
                        return 0;
                    }
                    return prevTimeLeft;
                });
            }, 1000);

            timerInterval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        } else if (!isActive && countdown !== countdownInitialTime) {
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
            setCountdown(countdownInitialTime);
            setTimeLeft(testTime);
        }

        return () => {
            document.removeEventListener("keydown", keyDown);
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
        };
    }, [isActive, countdown]);

    const clearText = () => {
        const elementRef = textRef;

        elementRef.current.childNodes.forEach((el) => {
            el.style.color = "#666";
            el.style.backgroundColor = "transparent";
            if (el.classList.contains("bug")) {
                el.classList.remove("bug");
            }
        });
        elementRef.current.childNodes[0].style.backgroundColor = "#CAFE48";
        elementRef.current.childNodes[0].style.color = "#000";
    };

    function startTimer() {
        setIsTimedOut(false);
        setIsActive(true);
        blurRef.current.blur();
        animation.play();
        clearText();
        bugArr = [];
        updateSum(-1);
    }

    const clearAnimation = () => {
        animation.seek(0);
        animation.pause();
    };

    const clearTime = () => {
        setIsTimedOut(false);
        setIsActive(false);
        clearAnimation();
        clearText();
    };

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <Grid2
            width={true}
            sx={{
                background: "transparent",
                display: "flex",
                justifyContent: "center",
                flexFlow: "column",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            {isTimedOut ? (
                <Typography variant="h3" fontSize="80px" color="#F95738">
                    {WPM} WPM
                </Typography>
            ) : (
                <Typography variant="h3" fontSize="80px" color="#F95738">
                    {formatTime(minutes)}:{formatTime(seconds)}
                </Typography>
            )}
            {/* <Typography variant="h3" fontSize="80px" color="#F95738">
                {countdown}
            </Typography> */}
            {!isActive ? (
                <Button ref={blurRef} variant="contained" color="primary" onClick={startTimer}>
                    Start
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={clearTime}>
                    Retry
                </Button>
            )}
        </Grid2>
    );
}

export default Timer;
