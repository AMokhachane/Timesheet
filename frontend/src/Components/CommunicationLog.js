import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CommunicationLog.module.css';

const CommunicationLog = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5282/api/client')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      clientId: parseInt(selectedClientId),
      content: message,
      loggedAt: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:5282/api/communicationlog', data);
      alert('Communication saved!');
      setMessage('');
      setSelectedClientId('');
    } catch (error) {
      console.error('Error posting communication:', error);
      alert('Failed to save communication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Communication Log</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Client:</label>
          <select
            className={styles.select}
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            required
          >
            <option value="">-- Select Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Notes:</label>
          <textarea
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter communication details here..."
            required
          ></textarea>
        </div>

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Communication'}
        </button>
      </form>
    </div>
  );
};

export default CommunicationLog;
