import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@mui/material';

const ContactForm = ({ onAddContact }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={name}
        onChange={handleChange}
        required
        inputProps={{
          pattern: "^[a-zA-Z]+((['\\-\\s][a-zA-Z ])?[a-zA-Z]*)*$",
          title:
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
        }}
      />
      <TextField
        label="Number"
        name="number"
        variant="outlined"
        value={number}
        onChange={handleChange}
        required
        inputProps={{
          pattern: '^\\d{3}-\\d{2}-\\d{2}$|^\\d{10,14}$',
          title:
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add contact
      </Button>
    </Box>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired
};

export default ContactForm;
