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
} from "@mui/material";
import SocialLogin from "../components/socialLogin";

const Register = () => {
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
            name="email"
            label="Email Address"
            type="email"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Register
          </Button>

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

export default Register;
