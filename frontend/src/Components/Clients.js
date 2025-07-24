import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientsCSS from './Clients.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientAllocation, setClientAllocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAllocation, setFilterAllocation] = useState('');
  const [editingClientId, setEditingClientId] = useState(null);

  // Track which client's action menu is open (store client id or null)
  const [openMenuId, setOpenMenuId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/client`, {
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

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/account/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load users');
        setLoading(false);
        console.error(err);
      });
  }, [token]);

  const clearForm = () => {
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setClientAllocation('');
    setIdNumber('');
    setError(null);
    setEditingClientId(null);
  };

  const openAddForm = () => {
    clearForm();
    setShowForm(true);
  };

  const openEditForm = (client) => {
    setCompanyName(client.companyName || '');
    setFirstName(client.firstName || '');
    setLastName(client.lastName || '');
    setEmail(client.email || '');
    setPhoneNumber(client.phoneNumber || '');
    setClientAllocation(client.clientAllocation || '');
    setIdNumber(client.idNumber || '');
    setEditingClientId(client.id);
    setShowForm(true);
    setOpenMenuId(null); // close the menu after clicking edit
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/client/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.filter(client => client.id !== clientId));
      setOpenMenuId(null); // close the menu after deletion
    } catch (err) {
      setError('Failed to delete client');
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !companyName || !email || !phoneNumber) return;

    const payload = {
      firstName,
      lastName,
      companyName,
      email,
      phoneNumber,
      clientAllocation,
      idNumber,
    };

    try {
      if (editingClientId) {
        // Edit mode - PUT request
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/client/${editingClientId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setClients(clients.map(c => (c.id === editingClientId ? response.data : c)));
      } else {
        // Add mode - POST request
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/client`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setClients([...clients, response.data]);
      }

      clearForm();
      setShowForm(false);
    } catch (err) {
      setError(editingClientId ? 'Failed to update client' : 'Failed to add client');
      console.error(err);
    }
  };

  // Toggle action menu open/close
  const toggleMenu = (clientId) => {
    if (openMenuId === clientId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(clientId);
    }
  };

  // Close menu if clicked outside — you can add this feature if you want later for better UX.

  return (
    <div className={ClientsCSS['clients-container']}>
      <h1 className={ClientsCSS['heading']}>Clients</h1>

      {!showForm && (
        <button className={ClientsCSS['add-client-btn']} onClick={openAddForm}>
          + Add Client
        </button>
      )}

      <div className={ClientsCSS['filters-container']}>
        <div className={ClientsCSS['search-wrapper']}>
          <FontAwesomeIcon icon={faSearch} className={ClientsCSS['search-icon']} />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={ClientsCSS['search-input']}
          />
        </div>

        <select
          value={filterAllocation}
          onChange={(e) => setFilterAllocation(e.target.value)}
          className={ClientsCSS['filter-select']}
        >
          <option value="">All Clients</option>
          {users.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className={ClientsCSS['client-form']}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
          <select
            value={clientAllocation}
            onChange={(e) => setClientAllocation(e.target.value)}
            required
          >
            <option value="">Assign to...</option>
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>

          <div className={ClientsCSS['form-buttons']}>
            <button type="submit">{editingClientId ? 'Update Client' : 'Save Client'}</button>
            <button
              type="button"
              className={ClientsCSS['cancel-btn']}
              onClick={() => {
                clearForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading clients...</p>}
      {error && <p className={ClientsCSS['error']}>{error}</p>}

      <table className={ClientsCSS['clients-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Client Allocation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((client) => {
              const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
              const company = client.companyName?.toLowerCase() || '';
              const emailLower = client.email?.toLowerCase() || '';
              const matchesSearch =
                fullName.includes(searchTerm.toLowerCase()) ||
                company.includes(searchTerm.toLowerCase()) ||
                emailLower.includes(searchTerm.toLowerCase());

              const matchesFilter = filterAllocation
                ? client.clientAllocation === filterAllocation
                : true;

              return matchesSearch && matchesFilter;
            })
            .map((client, index) => (
              <tr key={client.id || index}>
                <td>{index + 1}</td>
                <td>{client.firstName || '-'}</td>
                <td>{client.lastName || '-'}</td>
                <td>{client.companyName}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.clientAllocation || '-'}</td>
                <td style={{ position: 'relative' }}>
                  <button
                    className={ClientsCSS['action-btn']}
                    onClick={() => toggleMenu(client.id)}
                    aria-label="Toggle client actions"
                  >
                    &#8230; {/* This is the three dots character */}
                  </button>

                  {openMenuId === client.id && (
                    <div className={ClientsCSS['action-menu']}>
                      <button
                        onClick={() => openEditForm(client)}
                        className={ClientsCSS['action-menu-item']}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className={ClientsCSS['action-menu-item']}
                        type="button"
                        style={{ color: 'red' }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
