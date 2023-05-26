import { Box, CssBaseline } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <CssBaseline />
            <Grid
                container
                sx={{
                    height: "100%"
                }}
            >
                <Outlet />
            </Grid>
        </Box>
    );
};

export default MainLayout;
