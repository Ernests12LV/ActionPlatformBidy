// // Login.tsx

import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from '../../axiosInstance';
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/Login", { email, password });
      console.log(res.data); // Handle response (e.g., store token in localStorage)
      // Redirect to another page after successful login
      navigate("/home"); // Replace '/dashboard' with your desired redirect URL
    } catch (err:any) {
      console.error(err.response.data);
      // Handle error (e.g., show error message)
    }
  };

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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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



// import React, { useState } from 'react';
// import axios from '../../axiosInstance';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/Login', { email, password });
//       console.log(res.data); // Handle response (e.g., store token in localStorage)
//     } catch (err: any) {
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

// import { LockOutlined } from "@mui/icons-material";
// import {
//   Container,
//   CssBaseline,
//   Box,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
//   Grid,
// } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
    
//   };

//   return (
//     <>
//       <Container maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             mt: 20,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
//             <LockOutlined />
//           </Avatar>
//           <Typography variant="h5">Login</Typography>
//           <Box sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="password"
//               name="password"
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={handleLogin}
//             >
//               Login
//             </Button>
//             <Grid container justifyContent={"flex-end"}>
//               <Grid item>
//                 <Link to="/register">Don't have an account? Register</Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Login;