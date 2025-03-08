import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const UserMenu = ({ email, onLogout }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');

    dispatch(logoutUser());
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body1">{email}</Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

UserMenu.propTypes = {
  email: PropTypes.string.isRequired,
  onLogout: PropTypes.func
};

export default UserMenu;