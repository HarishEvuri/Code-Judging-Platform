import React from "react";
import {
  AppBar,
  Container,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";

import { DarkMode, LightMode, Notifications } from "@mui/icons-material";

const MenuLink = (props) => {
  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => ({
        textDecoration: "none",
        marginLeft: "20px",
        paddingTop: "12px",
        paddingBottom: "12px",
        color: "inherit",
        borderBottom: isActive ? "2px solid" : "",
      })}
    >
      {props.children}
    </NavLink>
  );
};

const Header = (props) => {
  const theme = useTheme();
  return (
    <AppBar color="inherit" elevation={1} position="relative">
      <Container maxWidth={"lg"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "50px",
          }}
        >
          <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2, my: 1 }}>
            Code Judge
          </Typography>

          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/problems">Problems</MenuLink>
          <MenuLink to="/contests">Contests</MenuLink>

          <IconButton
            color="inherit"
            sx={{ ml: "auto" }}
            size="small"
            onClick={props.changeMode}
          >
            {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <IconButton color="inherit" sx={{ marginLeft: "10px" }} size="small">
            <Notifications />
          </IconButton>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "10px",
            }}
          >
            <Button size="small" variant="text" color="inherit">
              Register
            </Button>
          </Link>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "10px",
            }}
          >
            <Button size="small" variant="text" color="inherit">
              Login
            </Button>
          </Link>
        </div>
      </Container>
    </AppBar>
  );
};

export default Header;
