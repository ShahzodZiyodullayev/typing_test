import { Typography } from "@mui/material";
import anime from "animejs";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Wpm = () => {
    const wpmRef = useRef(null);
    const { wpm, customization } = useSelector((state) => state);

    var myObject = {
        prop1: 0
    };

    useEffect(() => {
        const elemRef = wpmRef;
        anime({
            targets: myObject,
            prop1: wpm,
            easing: "linear",
            round: 1,
            update: function () {
                elemRef.current.innerHTML = JSON.stringify(myObject.prop1) + " wpm";
            }
        });
    }, [wpm]);

    return (
        <Typography noWrap variant="h3" fontSize="25px" color={customization.bool ? "#000" : "#fff"}>
            <em ref={wpmRef}></em>
        </Typography>
    );
};

export default Wpm;
