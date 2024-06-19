// LoginView.tsx
import React from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, IconButton, Alert } from "@mui/material";
import { LockOutlined, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import i18n from '../../i18n';
import LoginController from './LoginController';

const LoginView: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const { handleSubmit, email, setEmail, password, setPassword, showErrorAlert, setErrorAlert } = LoginController();

  const handleCloseAlert = () => {
    setErrorAlert(false); // Close the alert when user dismisses it
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ position: 'relative', mt: 2 }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} component={Link} to="/">
            <ArrowBack />
          </IconButton>
        </Box>
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">{t('login.title')}</Typography> {/* Translate 'Login' */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('login.email')} // Translate 'Email Address'
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label={t('login.password')} // Translate 'Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('login.loginButton')} {/* Translate 'Login' */}
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">{t('login.registerLink')}</Link> {/* Translate 'Don't have an account? Register' */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Alert component positioned in top-left corner */}
      {showErrorAlert && (
        <Alert severity="error" onClose={handleCloseAlert} sx={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
          {t('alerts.loginFailed')} {/* Translate 'Login Failed' */}
        </Alert>
      )}
    </>
  );
};

export default LoginView;