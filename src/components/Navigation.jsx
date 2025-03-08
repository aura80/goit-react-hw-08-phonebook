import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Contact Book
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/contacts">
          Contacts
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navigation;
