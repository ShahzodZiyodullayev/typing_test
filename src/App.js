import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import themes from "./themes";
import { useSelector } from "react-redux";
import Routes from "./routes";

function App() {
  const { customization } = useSelector((state) => state);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
