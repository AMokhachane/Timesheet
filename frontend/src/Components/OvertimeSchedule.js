import React, { useState, useEffect } from 'react';
import OvertimeCSS from './OvertimeSchedule.module.css';

const OvertimeSchedule = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [description, setDescription] = useState('');
  const [requests, setRequests] = useState([
    {
      date: '2025-07-20',
      startTime: '18:00',
      endTime: '20:00',
      totalHours: 2,
      description: 'Worked on monthly reports',
      status: 'Accepted',
    },
    {
      date: '2025-07-21',
      startTime: '19:00',
      endTime: '22:00',
      totalHours: 3,
      description: 'Resolved urgent client issues',
      status: 'Pending',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically calculate total hours
  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      let diff = (end - start) / (1000 * 60 * 60);
      if (diff < 0) diff = 0;
      setTotalHours(diff.toFixed(2));
    } else {
      setTotalHours('');
    }
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !description) return;

    setIsSubmitting(true);

    // Create new dummy request
    const newRequest = {
      date,
      startTime,
      endTime,
      totalHours: parseFloat(totalHours),
      description,
      status: 'Pending',
    };

    // Add to requests list
    setRequests((prev) => [...prev, newRequest]);

    // Reset form fields
    setDate('');
    setStartTime('');
    setEndTime('');
    setTotalHours('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className={OvertimeCSS['overtime-container']}>
      <h1>Overtime Schedule</h1>
      <form onSubmit={handleSubmit} className={OvertimeCSS['overtime-form']}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <input
          type="number"
          placeholder="Total Overtime Hours"
          value={totalHours}
          readOnly
        />
        <textarea
          placeholder="Description of work done"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      <h2>Overtime Requests</h2>
      <table className={OvertimeCSS['requests-table']}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Total Hours</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={idx}>
              <td>{req.date}</td>
              <td>{req.startTime}</td>
              <td>{req.endTime}</td>
              <td>{req.totalHours}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeSchedule;
