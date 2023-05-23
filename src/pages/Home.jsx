import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import anime from "animejs/lib/anime.es.js";
import "./style.css";

const DATA =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const Home = () => {
    const textRef = useRef(null);
    let sum = -1;

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

        // const animation = anime.timeline({
        //     targets: ".letter",
        //     easing: "easeInOutExpo",
        //     loop: true
        // });

        // animation
        //     .add({
        //         rotate: function () {
        //             return anime.random(-350, 350);
        //         },
        //         translateX: function () {
        //             return anime.random(-500, 500);
        //         },
        //         translateY: function () {
        //             return anime.random(-500, 500);
        //         },
        //         duration: 3000,
        //         delay: anime.stagger(10)
        //     })
        //     .add({
        //         rotate: 0,
        //         translateX: 0,
        //         translateY: 0,
        //         duration: 5000,
        //         delay: anime.stagger(10)
        //     });
    }, []);

    document.addEventListener("keydown", (e) => {
        console.log(sum);
        if (e.key === "Backspace") {
            if (sum >= 0) {
                if (sum < DATA.length - 1) {
                    textRef.current.childNodes[sum + 1].style.backgroundColor = "transparent";
                    textRef.current.childNodes[sum + 1].style.color = "#666";
                }
                textRef.current.childNodes[sum].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum].style.color = "#000";
                --sum;
            }
        } else if (e.key !== "Shift" && textRef.current.childNodes[sum + 1] && textRef.current.childNodes[sum + 1].textContent === e.key) {
            sum++;
            if (sum >= 0) {
                textRef.current.childNodes[sum].style.backgroundColor = "transparent";
                textRef.current.childNodes[sum].style.color = "#CAFE48"; // to'g'ri yozilgan harf rangi
            }
            if (sum < DATA.length - 1) {
                textRef.current.childNodes[sum + 1].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum + 1].style.color = "#000";
            }
        } else if (e.key !== "Shift" && textRef.current.childNodes[sum + 1] && textRef.current.childNodes[sum + 1].textContent !== e.key) {
            sum++;
            if (sum < DATA.length - 1) {
                textRef.current.childNodes[sum + 1].style.backgroundColor = "#CAFE48";
                textRef.current.childNodes[sum + 1].style.color = "#000";
            }
            textRef.current.childNodes[sum].style.backgroundColor = "transparent";
            textRef.current.childNodes[sum].style.color = "#F26171";
        }
    });

    return (
        <Grid2
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography ref={textRef} variant="h3" width="70%" color="#666" textAlign="center" position="relative"></Typography>
        </Grid2>
    );
};

export default Home;
