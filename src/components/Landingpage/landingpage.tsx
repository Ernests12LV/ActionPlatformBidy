import React from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const LandingPageView: React.FC = () => {
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <HomeIcon />
          </Avatar>
          <Typography variant="h5">BiDy</Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LandingPageView;
