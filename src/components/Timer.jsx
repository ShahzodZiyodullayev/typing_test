import { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import anime from "animejs/lib/anime.es.js";
import Wpm from "./Wpm";
import { useDispatch, useSelector } from "react-redux";
import { setWpm } from "../reducers/wpm";
import { setIsActiveTimer } from "../reducers/timer";

const testTime = 60;

function Timer({ countdownInitialTime, animation, calcResult, keyDown, bugArr, updateSum, textRef }) {
    const dispatch = useDispatch();
    const { customization, DATA } = useSelector((state) => state);
    const [countdown, setCountdown] = useState(countdownInitialTime);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(testTime);
    const [isTimedOut, setIsTimedOut] = useState(false);

    let timerAnimation = anime.timeline({
        targets: ".time"
    });

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
                        dispatch(setIsActiveTimer(false));
                        dispatch(setWpm(calcResult()));
                        timerAnimation.add({
                            translateX: { value: "0px", duration: 600 },
                            scaleX: [
                                { value: 1.3, duration: 150, easing: "easeOutExpo" },
                                { value: 1, duration: 450 }
                            ],
                            easing: "easeOutElastic(1, .8)"
                        });
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

    const clearAnimation = () => {
        animation.seek(0);
        animation.pause();
    };

    const clearText = () => {
        const elementRef = textRef;
        const m = elementRef.current.querySelectorAll(".letter");

        m.forEach((el) => {
            el.style.color = "#666";
            el.style.backgroundColor = "transparent";
            if (el.classList.contains("bug")) {
                el.classList.remove("bug");
            }
        });
        m[0].style.backgroundColor = "#CAFE48";
        m[0].style.color = "#000";
    };

    const startTimer = () => {
        timerAnimation.add({
            translateX: { value: "-60px", duration: 600 },
            scaleX: [
                { value: 1.3, duration: 150, easing: "easeOutExpo" },
                { value: 1, duration: 450 }
            ],
            easing: "easeOutElastic(1, .8)"
        });
        setIsTimedOut(false);
        setIsActive(true);
        animation.play();
        clearText();
        bugArr = [];
        updateSum(-1);
        dispatch(setIsActiveTimer(true));
    };

    const clearTime = () => {
        timerAnimation.add({
            translateX: { value: "0px", duration: 600 },
            scaleX: [
                { value: 1.3, duration: 150, easing: "easeOutExpo" },
                { value: 1, duration: 450 }
            ],
            easing: "easeOutElastic(1, .8)"
        });
        setIsTimedOut(false);
        setIsActive(false);
        clearAnimation();
        clearText();
        dispatch(setIsActiveTimer(false));
    };

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <Box>
            <Grid2
                sx={{
                    margin: "0 auto",
                    background: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    position: "relative",
                    width: "calc(100% - 70px)"
                }}
            >
                <IconButton
                    onClick={startTimer}
                    disabled={isActive}
                    sx={{ p: 0, mr: -3 }}
                    className="play-button"
                >
                    <PlayArrowIcon
                        sx={{
                            color: isActive ? "#777" : customization.bool ? "#fff" : "#000"
                        }}
                        fontSize="large"
                    />
                </IconButton>
                <Box
                    sx={{
                        width: "max-content",
                        background: customization.bool ? "#fff" : "#000",
                        px: 1,
                        borderRadius: 3,
                        height: "35px",
                        // ...(!isActive && { right: "-30px" }),
                        // display: "flex",
                        // alignItems: "center",
                        position: "relative",
                        right: "-30px",
                        zIndex: 9999
                        // transition: "all 400ms"
                    }}
                    className="time"
                >
                    {isTimedOut ? (
                        <Wpm />
                    ) : (
                        <Typography variant="h3" fontSize="25px" color={customization.bool ? "#000" : "#fff"}>
                            {formatTime(minutes)}:{formatTime(seconds)}
                        </Typography>
                    )}
                </Box>
                <IconButton
                    onClick={clearTime}
                    disabled={!isActive}
                    sx={{ p: 0, ml: -3 }}
                    className="stop-button"
                >
                    <StopIcon
                        sx={{
                            color: !isActive ? "#777" : customization.bool ? "#fff" : "#000"
                        }}
                        fontSize="large"
                    />
                </IconButton>
            </Grid2>
        </Box>
    );
}

export default Timer;
