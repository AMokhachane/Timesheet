import React, { useState } from 'react';
import TimesheetCSS from './Timesheet.module.css';

const Timesheet = () => {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState('');
  const [client, setClient] = useState('');
  const [hours, setHours] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (!date || !client || !hours) return;

    const newEntry = {
      date,
      client,
      hours: parseFloat(hours),
    };

    setEntries([...entries, newEntry]);
    setDate('');
    setClient('');
    setHours('');
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

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
        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hours Worked"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          step="0.1"
          min="0"
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      <table className={TimesheetCSS['entries-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Client</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.date}</td>
              <td>{entry.client}</td>
              <td>{entry.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={TimesheetCSS['total']}>
        Total Hours: <strong>{totalHours}</strong>
      </div>
    </div>
  );
};

export default Timesheet;
