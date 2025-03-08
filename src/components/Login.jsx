import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
// import { Navigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleSubmit = async event => {
        event.preventDefault();
        dispatch(loginUser({email, password}));
    };

    // if (auth.isAuthenticated) {
    //     return <Navigate to="/contacts" />;
    // }
    
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
        <Typography variant="h4">Login</Typography>
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
            Login
        </Button>
        </Box>
    );
};

export default Login;