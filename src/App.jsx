import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter, selectContacts, selectFilter, selectIsLoading, selectError, fetchContacts } from './redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import LocalStorageViewer from 'components/LocalStorageViewer';
import ReduxStateViewer from 'components/ReduxStateViewer';
import { selectAuth, logoutUser } from './redux/authSlice';
import { Container, CssBaseline } from '@mui/material';
import styles from './components/ContactForm.module.css';

const App = () => {

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [localStorageContactsByName, setLocalStorageContactsByName] = useState([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    const localStorageContacts = 'contacts';
    const storedContacts = JSON.parse(localStorage.getItem(localStorageContacts));
    setLocalStorageContactsByName(storedContacts);
  }, []);

  const handleAddContact = (name, number) => {
    if (
      Array.isArray(contacts) && 
      contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
    }
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = filter => {
    dispatch(setFilter(filter));
  };

  const getFilteredContacts = () => {
    if (Array.isArray(contacts)) {
      const allContacts = [...contacts, ...localStorageContactsByName];
      return allContacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return [];
  };

  const filteredContacts = getFilteredContacts();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Router>
      <CssBaseline />
      <Navigation />
      {auth.isAuthenticated && auth.user && (
        <UserMenu email={auth.user.email} onLogout={handleLogout} />
      )}
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/contacts"
            element={
              auth.isAuthenticated ? (
                <div className={styles.phonebook}>
                  <h1>Phonebook</h1>
                  <ContactForm onAddContact={handleAddContact} />
                  <h2>Contacts</h2>
                  <Filter value={filter} onChange={handleFilterChange} />
                  {isLoading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  <ContactList
                    contacts={filteredContacts}
                    onDeleteContact={handleDeleteContact}
                  />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/contacts" />} />
        </Routes>
        {auth.isAuthenticated && (
          <>
            <LocalStorageViewer />
            <ReduxStateViewer />
          </>
        )}
      </Container>
    </Router>
  );
};

export default App;
