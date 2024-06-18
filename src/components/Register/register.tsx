import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, IconButton } from "@mui/material";
import { LockOutlined, ArrowBack } from "@mui/icons-material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../axiosInstance';
import bcrypt from 'bcryptjs';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const saltRounds = 10;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      console.error('All fields are required');
      return;
    }

    // Hash the password before sending it to the server
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt);
    

    try {
      const res = await axios.post("/register", { name, email, password: hashedPassword, permission_level: 1 });
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error("Error occurred:", err.message);
      }
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
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default Register;
