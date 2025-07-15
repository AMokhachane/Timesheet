import React, { useState } from 'react';
import ClientsCSS from './Clients.module.css';

const Clients = () => {
  const [clients, setClients] = useState([
    { name: 'ABC Corporation', email: 'contact@abc.com' },
    { name: 'XYZ Enterprises', email: 'info@xyz.com' },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newClient = { name, email };
    setClients([...clients, newClient]);
    setName('');
    setEmail('');
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
          type="email"
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Client</button>
      </form>

      <table className={ClientsCSS['clients-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
