import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Wpm = () => {
    const { wpm, customization } = useSelector((state) => state);

    return (
        <Typography
            noWrap
            variant="h3"
            fontSize="25px"
            color={customization.bool ? "#000" : "#fff"}
        >
            <em>{wpm} WPM</em>
        </Typography>
    );
};

export default Wpm;
