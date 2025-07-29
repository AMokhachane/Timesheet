import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunicationLogAnalysis = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/client`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setClients(res.data))
      .catch(err => console.error('Error fetching clients:', err));
  }, []);

  useEffect(() => {
    if (!selectedClientId) {
      setLogs([]);
      return;
    }
    // TODO: Replace with real API call
    // axios.get(`/api/communicationlog/client/${selectedClientId}`, ...)
    setLogs([]);
  }, [selectedClientId]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Communication Log Analysis (Admin)</h2>

      <select
        className="border p-2 mb-4 w-full"
        value={selectedClientId}
        onChange={e => setSelectedClientId(e.target.value)}
      >
        <option value="">-- Select Client --</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>{client.companyName}</option>
        ))}
      </select>

      {selectedClientId && (
        <>
          <h3 className="font-semibold mb-2">Communication notes:</h3>
          {logs.length === 0 ? (
            <p>No communication notes found.</p>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {logs.map(log => (
                <li key={log.id} className="border p-3 rounded bg-gray-50">
                  <p>{log.note}</p>
                  <small className="text-gray-500">
                    {new Date(log.timestamp).toLocaleString()} - <b>{log.username}</b>
                  </small>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default CommunicationLogAnalysis;
