import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  }

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} {...contact} onDeleteContact={handleDeleteContact} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;