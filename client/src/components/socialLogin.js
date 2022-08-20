import React from "react";
import { Avatar, Box, Divider, useTheme } from "@mui/material";

import facebookLogo from "../static/images/facebook_logo.svg";
import googleLogo from "../static/images/google_logo.svg";
import linkedinLogo from "../static/images/linkedin_logo.svg";
import githubLogo from "../static/images/github_logo.svg";
import githubLogo2 from "../static/images/github_logo_2.svg";

const SocialLogin = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
        mt: 2,
      }}
    >
      <div onClick={() => console.log("something")}>
        <Avatar
          src={facebookLogo}
          sx={{ background: "white", cursor: "pointer" }}
          variant="rounded"
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <Avatar src={googleLogo} sx={{ cursor: "pointer" }} variant="rounded" />
      <Divider orientation="vertical" flexItem />
      <Avatar
        src={linkedinLogo}
        sx={{ background: "white", cursor: "pointer" }}
        variant="rounded"
      />
      <Divider orientation="vertical" flexItem />
      <Avatar
        src={theme.palette.mode === "light" ? githubLogo : githubLogo2}
        sx={{ cursor: "pointer" }}
        variant="rounded"
      />
    </Box>
  );
};

export default SocialLogin;
