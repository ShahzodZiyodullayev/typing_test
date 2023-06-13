import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useDispatch, useSelector } from "react-redux";
import { themeMode } from "../../../reducers/customization";
import { textSelector } from "../../../reducers/text";
import anime from "animejs";

const Header = ({ children }) => {
    const { customization, isActive } = useSelector((state) => state);
    const dispatch = useDispatch();

    let modeAnimation = anime.timeline({
        targets: ".mode"
    });

    let shuffleAnimation = anime.timeline({
        targets: ".shuffle"
    });

    const eventHandler = () => {
        modeAnimation.add({
            scale: [
                { value: 1.5, duration: 200, easing: "spring(0, 10, 10, 10)" },
                { value: 1, duration: 700, easing: "spring(0, 10, 0, 10)" }
            ]
        });
        dispatch(themeMode(!customization.bool));
    };

    const shuffle = () => {
        shuffleAnimation.add({
            scale: [
                { value: 1.5, duration: 200, easing: "spring(0, 10, 10, 10)" },
                { value: 1, duration: 700, easing: "spring(0, 10, 0, 10)" }
            ]
        });
        dispatch(textSelector());
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: "transparent",
                boxShadow: "none",
                zIndex: 9999
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton
                    className="shuffle"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={shuffle}
                    disabled={isActive}
                >
                    <ShuffleIcon sx={{ color: customization.bool ? "#fff" : "#000" }} />
                </IconButton>
                {children}
                <IconButton size="large" edge="end" color="inherit" aria-label="menu">
                    <Box
                        className="mode"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        onClick={eventHandler}
                    >
                        {customization.bool ? (
                            <DarkModeIcon sx={{ color: "#fff" }} />
                        ) : (
                            <WbSunnyIcon sx={{ color: "#000" }} />
                        )}
                    </Box>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
