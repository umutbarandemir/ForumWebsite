import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./login.css";
import Logo from "../assets/logo.png";
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   
    const navigate = useNavigate();

	const signUp = () => {
		fetch("http://localhost:4000/api/register", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert("Account created successfully!");
					navigate("/login");
				}
			})
			.catch((err) => console.error(err));
	};
    const handleSubmit = (e) => {
        e.preventDefault();
        
        signUp();
        setEmail("");
        setUsername("");
        setPassword("");
    };
    return (
        // <main className='register'>
        //     <h1 className='registerTitle'>Create an account</h1>
        //     <form className='registerForm' onSubmit={handleSubmit}>
        //         <label htmlFor='username'>Username</label>
        //         <input
        //             type='text'
        //             name='username'
        //             id='username'
        //             required
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //         <label htmlFor='email'>Email Address</label>
        //         <input
        //             type='text'
        //             name='email'
        //             id='email'
        //             required
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />
        //         <label htmlFor='password'>Password</label>
        //         <input
        //             type='password'
        //             name='password'
        //             id='password'
        //             required
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <button className='registerBtn'>REGISTER</button>
        //         <p>
        //             Have an account? <Link to='/'>Sign in</Link>
        //         </p>
        //     </form>
        // </main>
        <body>
            <div class="split left">
                <div class="centered">
                    <img src={Logo}  alt="logo"/>
                </div>
            </div>

            <div class="split right">
                <div class="centered">      
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          
          <Grid
            item
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                REGISTER
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Do you have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
                </div>
            </div>
        </body>
    );
};

export default Register;