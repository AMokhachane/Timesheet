import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientsCSS from './Clients.module.css';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    axios
      .get('http://localhost:5282/api/client', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load clients');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!name || !contactPerson || !email || !phoneNumber) return;

    const token = localStorage.getItem('token');

    try {
      const payload = {
        name,
        contactPerson,
        email,
        phoneNumber,
      };

      const response = await axios.post(
        'http://localhost:5282/api/client',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setClients([...clients, response.data]);
      setName('');
      setContactPerson('');
      setEmail('');
      setPhoneNumber('');
      setError(null);
    } catch (err) {
      setError('Failed to add client');
      console.error(err);
    }
  };

  return (
    <div className={ClientsCSS['clients-container']}>
      <h1 className={ClientsCSS['heading']}>Clients</h1>

      <form onSubmit={handleAddClient} className={ClientsCSS['client-form']}>
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Add Client</button>
      </form>

      {loading && <p>Loading clients...</p>}
      {error && <p className={ClientsCSS['error']}>{error}</p>}

      <table className={ClientsCSS['clients-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id || index}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.contactPerson}</td>
              <td>{client.email}</td>
              <td>{client.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
