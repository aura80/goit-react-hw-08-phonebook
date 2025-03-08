const LocalStorageViewer = () => {
    const localStorageData = JSON.parse(localStorage.getItem('contacts'));

    return (
      <div>
        <h3>Local Storage Content</h3>
        <h4>Name and Phone no.:</h4>
        <ul>
          {localStorageData.map((contact, index) => (
            <li key={index}>
              Name: {contact.name}, Phone no.: {contact.number}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default LocalStorageViewer;
