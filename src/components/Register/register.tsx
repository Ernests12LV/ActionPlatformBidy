import React from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Link } from "react-router-dom";
import RegisterController from './RegisterController';
import { ArrowBack } from '@mui/icons-material';

const RegisterView: React.FC = () => {
  const { handleSubmit, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword } = RegisterController();

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ position: 'relative', mt: 2 }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} component={Link} to="/">
            <ArrowBack />
          </IconButton>
        </Box>
        <Box sx={{ mt: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterView;
