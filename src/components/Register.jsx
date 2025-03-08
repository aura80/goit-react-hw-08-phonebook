import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from '@mui/material';
// import { Navigate } from "react-router-dom";
import { registerUser } from '../redux/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };
  
  // if (auth.isAuthenticated) {
  //   return <Navigate to="/contacts" />
  // }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h4">Register</Typography>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  );
};

export default Register;