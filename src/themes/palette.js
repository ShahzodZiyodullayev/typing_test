export default function themePalette(theme) {
  return {
    mode: theme?.customization?.navType,
    primary: {
      light: "#555",
      main: "#777",
      dark: "#222",
    },
  };
}
