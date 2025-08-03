import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import NavBar from "./NavBar"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { useAppSelector } from "../store/store";
//import { getInitialDarkMode } from "./uiThemeMode";

function App() {

  const {darkMode} = useAppSelector(state => state.uiThemeMode);
  //const dispatch = useAppDispatch();
  //dispatch(getInitialDarkMode());
  
  const palletteType = darkMode ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: (palletteType === 'light') ? '#eaeaea' : '#121212'
      }

    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ScrollRestoration />
        <CssBaseline />
        <NavBar   />
        <Box sx={{minHeight: '100vh', background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : 
          'radial-gradient(circle, #baecf9, #f0f9ff)', py: 6}}>
          <Container maxWidth="xl" sx={{ marginTop: 8 }}>
            <Outlet></Outlet>
          </Container>
        </Box>

      </ThemeProvider>

    </>

  )
}

export default App
