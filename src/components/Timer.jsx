import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function Timer({ countdownInitialTime, animation, calcResult, keyDown, bugArr, sum, textRef, modifiedText }) {
    const blurRef = useRef();
    const [countdown, setCountdown] = useState(countdownInitialTime);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        console.log(bugArr);
        console.log(sum);
    }, [isTimedOut]);

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
                    if (prevTimeLeft === 0) {
                        clearInterval(countdownInterval);
                        clearInterval(timerInterval);
                        setIsTimedOut(true);
                        setIsActive(false);
                        calcResult();
                        document.removeEventListener("keydown", keyDown);
                        return 0;
                    }
                    return prevTimeLeft;
                });
            }, 1000);
            document.addEventListener("keydown", keyDown);

            timerInterval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        } else if (!isActive && countdown !== countdownInitialTime) {
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
            setCountdown(countdownInitialTime);
            setTimeLeft(10);
        }

        return () => {
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
            document.removeEventListener("keydown", keyDown);
        };
    }, [isActive, countdown]);

    const clearText = () => {
        const elementRef = textRef;

        elementRef.current.childNodes[0].style.backgroundColor = "#CAFE48";
        elementRef.current.childNodes[0].style.color = "#000";
        elementRef.current.childNodes.forEach((el) => {
            el.style.color = "#666";
            if (el.classList.contains("bug")) {
                el.classList.remove("bug");
            }
        });
    };

    function startTimer() {
        console.log(sum);
        setIsTimedOut(false);
        setIsActive(true);
        blurRef.current.blur();
        animation.play();
        clearText();
        bugArr.length = 0;
        modifiedText = null;
        sum = -1;
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
        <Box sx={{ display: "flex", justifyContent: "center", flexFlow: "column", zIndex: 9999 }}>
            {isTimedOut ? (
                <Typography variant="h3" fontSize="80px" color="#F95738">
                    Finish
                </Typography>
            ) : (
                <Typography variant="h3" fontSize="80px" color="#F95738">
                    {formatTime(minutes)}:{formatTime(seconds)}
                </Typography>
            )}
            <Typography variant="h3" fontSize="80px" color="#F95738">
                {countdown}
            </Typography>
            {!isActive ? (
                <Button ref={blurRef} variant="contained" color="primary" onClick={startTimer}>
                    Start
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={clearTime}>
                    Retry
                </Button>
            )}
        </Box>
    );
}

export default Timer;
