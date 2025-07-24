import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimesheetCSS from './Timesheet.module.css';

const Timesheet = () => {
  const [entries, setEntries] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD


  const token = localStorage.getItem('token');

  // Format time helper
  const formatTimeWithSeconds = (time) => {
    return time.length === 5 ? `${time}:00` : time;
  };

  // Fetch clients and timesheets on mount
  useEffect(() => {
    // Fetch clients
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/client`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClients(res.data))
      .catch((err) => console.error('Error fetching clients:', err));

    // Fetch timesheets
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/timesheet`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Map timesheets to entries format expected
        const mappedEntries = res.data.map((entry) => {
          // Find client name for this entry
          const clientName = clients.find((c) => c.id === entry.clientId)?.companyName || '';

          // Calculate total hours
          const start = new Date(`1970-01-01T${formatTimeWithSeconds(entry.startTime)}`);
          const end = new Date(`1970-01-01T${formatTimeWithSeconds(entry.endTime)}`);
          let diffHours = (end - start) / (1000 * 60 * 60);
          if (diffHours < 0) diffHours = 0;

          return {
            id: entry.id,
            date: entry.uploadDate,
            client: clientName,
            projectName: entry.projectName,
            taskDescription: entry.taskDescription,
            startTime: entry.startTime,
            endTime: entry.endTime,
            isBillable: entry.isBillable,
            totalHours: parseFloat(diffHours.toFixed(2)),
          };
        });

        setEntries(mappedEntries);
      })
      .catch((err) => console.error('Error fetching timesheets:', err));
  }, [token, clients]);

  const handleAddEntry = async (e) => {
    e.preventDefault();

    if (
      !date ||
      !selectedClientId ||
      !projectName ||
      !taskDescription ||
      !startTime ||
      !endTime
    )
      return;

    const formattedStart = formatTimeWithSeconds(startTime);
    const formattedEnd = formatTimeWithSeconds(endTime);

    const start = new Date(`1970-01-01T${formattedStart}`);
    const end = new Date(`1970-01-01T${formattedEnd}`);
    let diffHours = (end - start) / (1000 * 60 * 60);
    if (diffHours < 0) diffHours = 0;

    try {
      const payload = {
        uploadDate: date,
        projectName,
        clientId: parseInt(selectedClientId),
        taskDescription,
        startTime: formattedStart,
        endTime: formattedEnd,
        isBillable,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/timesheet`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const savedEntry = response.data;

      const clientName =
        clients.find((c) => c.id === savedEntry.clientId)?.companyName || '';

      setEntries([
        ...entries,
        {
          id: savedEntry.id,
          date,
          client: clientName,
          projectName: savedEntry.projectName,
          taskDescription: savedEntry.taskDescription,
          startTime: savedEntry.startTime,
          endTime: savedEntry.endTime,
          isBillable: savedEntry.isBillable,
          totalHours: parseFloat(diffHours.toFixed(2)),
        },
      ]);

      // Reset form
      setSelectedClientId('');
      setProjectName('');
      setTaskDescription('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setIsBillable(false);
    } catch (error) {
      console.error('Failed to save timesheet:', error);
      alert('Error saving timesheet. Please try again.');
    }
  };

  const totalHours = entries.reduce((sum, e) => sum + e.totalHours, 0);

  return (
    <div className={TimesheetCSS['timesheet-container']}>
      <h1 className={TimesheetCSS['heading']}>Timesheet</h1>

      <form onSubmit={handleAddEntry} className={TimesheetCSS['timesheet-form']}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Client
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.companyName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <label style={{ color: '#25a372', alignSelf: 'center' }}>
          <input
            type="checkbox"
            checked={isBillable}
            onChange={() => setIsBillable(!isBillable)}
          />{' '}
          Billable
        </label>
        <button type="submit">Add Entry</button>
      </form>

      <p className={TimesheetCSS['today-date']}>Today: {today}</p>

      <table className={TimesheetCSS['entries-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Client</th>
            <th>Project</th>
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Billable</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.client}</td>
              <td>{entry.projectName}</td>
              <td>{entry.taskDescription}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.isBillable ? 'Yes' : 'No'}</td>
              <td>{entry.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={TimesheetCSS['total']}>
        Total Hours: <strong>{totalHours.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Timesheet;
