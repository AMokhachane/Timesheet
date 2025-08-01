import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './CommunicationLog.module.css';

const CommunicationLog = () => {
  const [clients, setClients] = useState([]);
  const [communicationMethod, setCommunicationMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [clientId, setClientId] = useState("");
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [allocatedBy, setAllocatedBy] = useState("");

  useEffect(() => {
    if (!token) return;

    // Fetch communication logs
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/communicationlog`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Failed to fetch logs", err));

    // Fetch users
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/account/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users", err));

    // Fetch clients
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/client`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Failed to fetch clients", err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId || !communicationMethod || !notes || !allocatedBy) return;

    const payload = {
      clientId,
      communicationMethod,
      notes,
      allocatedBy,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/communicationlog`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh logs
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/communicationlog`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLogs(res.data);
      setNotes("");
      setClientId("");
      setCommunicationMethod("");
      setAllocatedBy("");
    } catch (err) {
      console.error("Failed to add communication log", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Communication Log</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>Communication Method</label>
          <select
            value={communicationMethod}
            onChange={(e) => setCommunicationMethod(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Method</option>
            <option value="In-Person Meeting">In-Person Meeting</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div>
          <label className={styles.label}>Allocated By</label>
          <select
            value={allocatedBy}
            onChange={(e) => setAllocatedBy(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Assign to...</option>
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>

      <div>
        <h3 className={styles.logsHeading}>Previous Logs</h3>
        <ul className={styles.logList}>
          {logs.map((log) => (
            <li key={log.id} className={styles.logItem}>
              <p className={styles.logText}>
                <strong>Client:</strong> {log.client?.companyName || "Unknown"}
              </p>
              <p className={styles.logText}>
                <strong>Method:</strong> {log.communicationMethod}
              </p>
              <p className={styles.logText}>
                <strong>Notes:</strong> {log.notes}
              </p>
              <p className={styles.logText}>
                <strong>Allocated By:</strong> {log.allocatedBy}
              </p>
              <p className={styles.logDate}>
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunicationLog;
