import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./Time.module.css";

const TimesheetAnalysis = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const startOfWeek = dayjs().add(weekOffset, 'week').startOf('week');
  const endOfWeek = dayjs().add(weekOffset, 'week').endOf('week');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/account/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error.response || error.message));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/timesheet/user/${selectedUserId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setTimesheets(res.data))
        .catch((error) => console.error("Error fetching timesheets:", error.response || error.message));
    }
  }, [selectedUserId]);

  const filteredTimesheets = timesheets.filter((entry) => {
    const entryDate = dayjs(entry.uploadDate);
    return entryDate.isAfter(startOfWeek.subtract(1, 'day')) && entryDate.isBefore(endOfWeek.add(1, 'day'));
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Timesheet Analysis</h1>

      <label className={styles.label}>Select a user:</label>
      <select
        className={styles.select}
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Choose User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      {selectedUserId && (
        <div className={styles.nav}>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(weekOffset - 1)}
          >
            ⬅ Previous Week
          </button>
          <span className={styles.weekLabel}>
            Week: {startOfWeek.format("MMM D")} – {endOfWeek.format("MMM D")}
          </span>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(weekOffset + 1)}
          >
            Next Week ➡
          </button>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Date</th>
            <th>Project</th>
            <th>Client</th>
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Billable</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredTimesheets.length === 0 ? (
            <tr>
              <td colSpan="8" className={styles.noData}>No timesheets found for this week.</td>
            </tr>
          ) : (
            filteredTimesheets.map((entry) => (
              <tr key={entry.id} className={styles.row}>
                <td>{entry.uploadDate?.split("T")[0]}</td>
                <td>{entry.projectName}</td>
                <td>{entry.client?.name || "N/A"}</td>
                <td>{entry.taskDescription}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.isBillable ? "Yes" : "No"}</td>
                <td>{entry.totalHours}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetAnalysis;
