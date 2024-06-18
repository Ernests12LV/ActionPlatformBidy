import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
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
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">BiDy</Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to="/login" // Specify the path to navigate to
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to="/register" // Specify the path to navigate to
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
