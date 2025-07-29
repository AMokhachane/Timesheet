import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunicationLog = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]); // communication notes for selected client

  // fetch clients on mount
  useEffect(() => {
    // TODO: replace with real API call
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/client`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setClients(res.data))
      .catch(err => console.error('Error fetching clients:', err));
  }, []);

  // fetch logs when client changes
  useEffect(() => {
    if (!selectedClientId) {
      setLogs([]);
      return;
    }
    // TODO: replace with real API call
    // Mock fetching logs for client
    // axios.get(`/api/communicationlog/client/${selectedClientId}`, ...)
    // For now, just clear or simulate empty
    setLogs([]);
  }, [selectedClientId]);

  const handleAddNote = () => {
    if (!selectedClientId || !note.trim()) return alert('Select client and enter a note');

    const newLog = {
      id: Date.now(),
      clientId: selectedClientId,
      note: note.trim(),
      timestamp: new Date().toISOString(),
      username: 'You', // current logged in user (simplified here)
    };

    // TODO: POST to backend here

    setLogs(prev => [newLog, ...prev]);
    setNote('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Communication Log</h2>

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

      <textarea
        className="border p-2 mb-4 w-full"
        rows={4}
        placeholder="Write your note here..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700"
        onClick={handleAddNote}
      >
        Add Note
      </button>

      <h3 className="font-semibold mb-2">Notes for selected client:</h3>
      {logs.length === 0 ? (
        <p>No notes yet.</p>
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
    </div>
  );
};

export default CommunicationLog;
