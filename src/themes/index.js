import { createTheme } from "@mui/material/styles";

import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";
import { colors } from "@mui/material";

export const theme = (customization) => {
  const themeOption = {
    colors,
    backgroundDefault: "",
    primaryTextColor: "",
    ...customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
    customization,
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
