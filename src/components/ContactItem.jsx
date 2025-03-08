import PropTypes from 'prop-types';
import { ListItem, ListItemText, Button } from '@mui/material';

const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <ListItem>
    <ListItemText primary={name} secondary={number} />
    <Button
      variant="contained"
      color="secondary"
      onClick={() => onDeleteContact(id)}
    >
      Delete
    </Button>
  </ListItem>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactItem;