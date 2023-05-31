import React, { useEffect, useMemo, useRef } from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import anime from "animejs/lib/anime.es.js";
import "./style.css";
import Timer from "../components/Timer";
import Header from "../layouts/MainLayout/Header/Header";
import { useSelector } from "react-redux";

const Home = () => {
    const { DATA } = useSelector((state) => state);
    const textRef = useRef(null);
    let bugArr = [];
    let sum = -1;
    let modifiedText = [];

    const updateSum = (newSum) => {
        sum = newSum;
    };

    const animation = useMemo(() => {
        let animation = anime.timeline({
            targets: ".letter",
            easing: "easeInOutExpo"
        });
        return animation;
    }, []);

    useEffect(() => {
        const elementRef = textRef;
        elementRef.current.innerHTML = null;
        const words = DATA.split(" ");
        words.forEach((word) => {
            let w = document.createElement("em");
            [...word.split(""), " "].forEach((letter) => {
                let span = document.createElement("span");
                span.textContent = letter;
                span.style.whiteSpace = "pre";
                span.classList.add("letter");

                w.appendChild(span);
            });
            elementRef.current.appendChild(w);
        });
        const m = document.querySelectorAll(".letter");
        m[0].style.backgroundColor = "#CAFE48";
        m[0].style.color = "#000";

        animation
            .add({
                rotate: function () {
                    return anime.random(-350, 350);
                },
                translateX: function () {
                    return anime.random(-500, 500);
                },
                translateY: function () {
                    return anime.random(-500, 500);
                },
                opacity: 0.2,
                duration: 0
            })
            .add({
                rotate: 0,
                translateX: 0,
                translateY: 0,
                duration: 2000,
                delay: anime.stagger(5)
            })
            .add({
                opacity: 1,
                rotate: 0,
                translateX: 0,
                translateY: 0,
                duration: 1000,
                delay: anime.stagger(20, { grid: [8, 67], from: "center" })
            });

        animation.seek(0);
        animation.pause();
    }, [DATA]);

    const calcResult = () => {
        bugAnimation();
        const a = DATA;
        modifiedText = a.slice(0, sum + 1).split("");
        bugArr.forEach((index) => {
            if (index < modifiedText.length) {
                if (
                    modifiedText[index] === " " ||
                    modifiedText[index] === "," ||
                    modifiedText[index] === "." ||
                    modifiedText[index] === "-" ||
                    modifiedText[index] === `"`
                ) {
                    modifiedText[index] = " ";
                } else {
                    modifiedText[index] = "_";
                }
            }
        });

        modifiedText = modifiedText.join("");
        modifiedText = modifiedText
            .split(" ")
            .filter((word) => !word.includes("_"));
        modifiedText = modifiedText.filter((word) => word.trim().length);
        // setText(modifiedText);
        return sum >= 0
            ? Math.round(
                  modifiedText.length * ((sum + 1 - bugArr.length) / (sum + 1))
              )
            : 0;
    };

    const bugAnimation = () => {
        const animation = anime.timeline({
            targets: ".bug",
            easing: "easeInOutExpo"
        });

        animation
            .add({
                rotate: function () {
                    return anime.random(-350, 350);
                },
                translateX: function () {
                    return anime.random(-500, 500);
                },
                translateY: function () {
                    return anime.random(-500, 500);
                },
                opacity: 0.5,
                duration: 3000,
                delay: anime.stagger(10)
            })
            .add({
                rotate: 0,
                translateX: 0,
                translateY: 0,
                duration: 5000,
                delay: anime.stagger(10)
            });
    };

    const keyDown = (e) => {
        const m = document.querySelectorAll(".letter");
        if (e.key === "Backspace") {
            if (sum >= 0) {
                if (sum < DATA.length - 1) {
                    m[sum + 1].style.backgroundColor = "transparent";
                    m[sum + 1].style.color = "#666";
                }
                m[sum].style.backgroundColor = "#CAFE48";
                m[sum].style.color = "#000";
                m[sum].classList.remove("bug");
                if (bugArr[bugArr.length - 1] === sum) {
                    bugArr.pop();
                }
                --sum;
            }
        } else if (
            e.key !== "Shift" &&
            m[sum + 1] &&
            m[sum + 1].textContent === e.key
        ) {
            sum++;
            if (sum >= 0) {
                m[sum].style.backgroundColor = "transparent";
                m[sum].style.color = "#CAFE48"; // to'g'ri yozilgan harf rangi
                m[sum].style.opacity = 1;
            }
            if (sum < DATA.length - 1) {
                m[sum + 1].style.backgroundColor = "#CAFE48";
                m[sum + 1].style.opacity = 1;
                m[sum + 1].style.color = "#000";
            }
        } else if (
            e.key !== "Shift" &&
            m[sum + 1] &&
            m[sum + 1].textContent !== e.key
        ) {
            sum++;
            if (sum < DATA.length - 1) {
                m[sum + 1].style.backgroundColor = "#CAFE48";
                m[sum + 1].style.color = "#000";
            }
            m[sum].style.backgroundColor = "transparent";
            m[sum].style.opacity = 1;
            m[sum].style.color = "#F26171";
            m[sum].classList.add("bug");
            bugArr.push(sum);
        }
        if (sum === DATA.length - 1) {
            calcResult();
        }
    };

    return (
        <Grid2
            container
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexFlow: "column",
                position: "relative",
                alignItems: "center"
            }}
        >
            <Header>
                <Timer
                    countdownInitialTime={Math.round(
                        ((DATA.length - 1) * 5 + 2000) / 1000
                    )}
                    animation={animation}
                    calcResult={calcResult}
                    keyDown={keyDown}
                    bugArr={bugArr}
                    updateSum={updateSum}
                    textRef={textRef}
                />
            </Header>
            <Grid2 sx={{ flex: "auto", height: "100%" }}>
                <Grid2
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        ref={textRef}
                        variant="h3"
                        width="70%"
                        color="#666"
                        textAlign="center"
                        position="relative"
                    ></Typography>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default Home;
