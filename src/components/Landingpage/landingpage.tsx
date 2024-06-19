import React from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LandingPageView: React.FC = () => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation hook

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            <IconButton onClick={() => changeLanguage('en')}>
              <Typography variant="body2">English</Typography>
            </IconButton>
            <IconButton onClick={() => changeLanguage('fr')} sx={{ ml: 1 }}>
              <Typography variant="body2">Français</Typography>
            </IconButton>
            <IconButton onClick={() => changeLanguage('lv')} sx={{ ml: 1 }}>
              <Typography variant="body2">Latviešu</Typography>
            </IconButton>
          </Box>
        <Box sx={{ position: 'relative' }}>
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
            <Typography variant="h5">{t('landing.title')}</Typography> {/* Translate 'BiDy' */}
            <Box sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                component={Link}
                to="/login"
              >
                {t('landing.loginButton')} {/* Translate 'Login' */}
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                component={Link}
                to="/register"
              >
                {t('landing.registerButton')} {/* Translate 'Register' */}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LandingPageView;
