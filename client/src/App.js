import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";
import ProblemsPage from "./pages/problemsPage";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    action: {
      hover: "#f2f6f8",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const App = () => {
  const [isLight, setIsLight] = useState(false);

  const changeMode = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header changeMode={changeMode} />
        <Container sx={{ mt: 2 }}>
          <Routes>
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
