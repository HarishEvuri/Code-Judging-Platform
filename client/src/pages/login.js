import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SocialLogin from "../components/socialLogin";

const Login = () => {
  const theme = useTheme();

  return (
    <Container maxWidth={"xs"}>
      <Paper
        sx={{
          marginTop: 6,
          py: 4,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={2}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/logo.png"
          sx={{ width: 64, height: 64 }}
        />
        <Typography component="h1" variant="h5">
          Code Judge
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="dense"
            required
            fullWidth
            label="Username"
            name="username"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Login
          </Button>

          <Link
            to="/forgot-password"
            style={{
              color: theme.palette.mode === "light" ? "inherit" : "#b7c9cc",
            }}
          >
            <Typography variant="body2" sx={{ mb: 2 }}>
              Forgot Password?
            </Typography>
          </Link>

          <Divider sx={{ mt: 1 }}>
            <Typography variant="body2" style={{ color: "#b7c9cc" }}>
              or connect with
            </Typography>
          </Divider>

          <SocialLogin />
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
