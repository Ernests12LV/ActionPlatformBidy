import { LockOutlined, ArrowBack } from "@mui/icons-material";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import axios from '../../axiosInstance';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res.data);
      navigate("/home");
    } catch (err: any) {
      console.error(err.response ? err.response.data : "Error occurred:", err.message);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ position: 'relative', mt: 2 }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => navigate("/home")}>
            <ArrowBack />
          </IconButton>
        </Box>
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
