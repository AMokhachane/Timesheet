import React, { useState } from 'react';
import styles from './LeaveRequest.module.css';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Leave Request Submitted:', formData);
    // Replace this with an API call or localStorage logic
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Leave Request Form</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name */}
          <div className={styles.group}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {/* Leave Type */}
          <div className={styles.group}>
            <label className={styles.label}>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select Leave Type</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="family">Family Responsibility</option>
              <option value="unpaid">Unpaid Leave</option>
            </select>
          </div>

          {/* Dates */}
          <div className={styles.dateRow}>
            <div className={styles.group}>
              <label className={styles.label}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Reason */}
          <div className={styles.group}>
            <label className={styles.label}>Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className={styles.textarea}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.button}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
