import { Box, CssBaseline } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { md: "100vh", xs: "auto" },
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Grid
        container
        sx={{
          height: { md: "100%", xs: "auto" },
        }}
      >
        <Outlet />
      </Grid>
    </Box>
  );
};

export default MainLayout;
