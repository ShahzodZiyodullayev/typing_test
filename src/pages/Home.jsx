import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import anime from "animejs/lib/anime.es.js";
import "./style.css";
import Timer from "../components/Timer";

const DATA =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Aliquam consectetur erat nunc, quis scelerisque ipsum pellentesque quis. Nullam accumsan vitae nulla nec bibendum. Etiam vehicula mauris non neque dignissim tempus vitae eu nulla. Aliquam tincidunt vestibulum mauris, eu blandit tellus gravida vitae. Aliquam gravida eros volutpat dolor aliquet, at iaculis dolor suscipit. Proin sed ex quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec blandit, leo nec tempus viverra, nisl neque sodales massa, non sollicitudin sapien lorem in risus. Nunc leo ligula, posuere et ullamcorper sit amet, pretium et urna. Sed commodo mauris quis eros sodales maximus. Aliquam ultrices in mauris id fringilla. Donec elit enim, pellentesque eu blandit ac, auctor non sapien. Pellentesque eget elit efficitur, cursus est eget, molestie dolor. Fusce ultrices vehicula velit a posuere. Pellentesque egestas et eros in aliquet. Mauris in neque placerat, mollis felis nec, rutrum mi.";

const Home = () => {
    const textRef = useRef(null);
    const bugArr = [];
    let sum = -1;
    let modifiedText;

    const updateSum = (newSum) => {
        sum = newSum;
    };

    const animation = anime.timeline({
        targets: ".letter",
        easing: "easeInOutExpo"
    });

    document.addEventListener("keydown", () => console.log(sum, bugArr, modifiedText));

    useEffect(() => {
        const elementRef = textRef;
        const d = DATA.split("");
        d.forEach((character) => {
            const span = document.createElement("span");
            span.textContent = character;
            span.style.whiteSpace = "pre";
            span.classList.add("letter");
            elementRef.current.appendChild(span);
        });
        elementRef.current.childNodes[0].style.backgroundColor = "#CAFE48";
        elementRef.current.childNodes[0].style.color = "#000";

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
                delay: anime.stagger(20, { grid: [18, 74], from: "center" })
            });

        animation.seek(0);
        animation.pause();
    }, []);

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
        modifiedText = modifiedText.split(" ").filter((word) => !word.includes("_"));
        modifiedText = modifiedText.filter((word) => word.trim().length);
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
        if (e.key === "Backspace") {
            if (sum >= 0) {
                if (sum < DATA.length - 1) {
                    textRef.current.childNodes[sum + 1].style.backgroundColor = "transparent";
                    textRef.current.childNodes[sum + 1].style.color = "#666";
                }
                textRef.current.childNodes[sum].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum].style.color = "#000";
                textRef.current.childNodes[sum].classList.remove("bug");
                if (bugArr[bugArr.length - 1] === sum) {
                    bugArr.pop();
                }
                --sum;
            }
        } else if (e.key !== "Shift" && textRef.current.childNodes[sum + 1] && textRef.current.childNodes[sum + 1].textContent === e.key) {
            sum++;
            if (sum >= 0) {
                textRef.current.childNodes[sum].style.backgroundColor = "transparent";
                textRef.current.childNodes[sum].style.color = "#CAFE48"; // to'g'ri yozilgan harf rangi
                textRef.current.childNodes[sum].style.opacity = 1;
            }
            if (sum < DATA.length - 1) {
                textRef.current.childNodes[sum + 1].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum + 1].style.opacity = 1;
                textRef.current.childNodes[sum + 1].style.color = "#000";
            }
        } else if (e.key !== "Shift" && textRef.current.childNodes[sum + 1] && textRef.current.childNodes[sum + 1].textContent !== e.key) {
            sum++;
            if (sum < DATA.length - 1) {
                textRef.current.childNodes[sum + 1].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum + 1].style.color = "#000";
            }
            textRef.current.childNodes[sum].style.backgroundColor = "transparent";
            textRef.current.childNodes[sum].style.opacity = 1;
            textRef.current.childNodes[sum].style.color = "#F26171";
            textRef.current.childNodes[sum].classList.add("bug");
            bugArr.push(sum);
        }
        if (sum === DATA.length - 1) {
            calcResult();
        }
    };

    return (
        <Grid2
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexFlow: "column"
            }}
        >
            <Timer
                countdownInitialTime={Math.round(((DATA.length - 1) * 5 + 2000) / 1000)}
                animation={animation}
                calcResult={calcResult}
                keyDown={keyDown}
                bugArr={bugArr}
                updateSum={updateSum}
                textRef={textRef}
                modifiedText={modifiedText}
            />
            <Typography ref={textRef} variant="h3" width="70%" color="#666" textAlign="center" position="relative"></Typography>
        </Grid2>
    );
};

export default Home;
