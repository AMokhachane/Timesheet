import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./Time.module.css";
import style from "./TimesheetAnalysis.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const TimesheetAnalysis = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  // Get start and end of the current month
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  // Get start and end of current weekOffset (for timesheet table)
  const startOfWeek = dayjs().add(weekOffset, "week").startOf("week");
  const endOfWeek = dayjs().add(weekOffset, "week").endOf("week");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/account/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((error) =>
        console.error("Error fetching users:", error.response || error.message)
      );

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/timesheet`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTimesheets(res.data))
      .catch((error) =>
        console.error("Error fetching timesheets:", error.response || error.message)
      );
  }, []);

  // Filter timesheets by user if selected
  const filteredByUser = selectedUserId
    ? timesheets.filter((t) => t.userId === selectedUserId)
    : timesheets;

  // Filter timesheets by week for the table
  const filteredTimesheets = filteredByUser.filter((entry) => {
    const entryDate = dayjs(entry.uploadDate);
    return (
      entryDate.isAfter(startOfWeek.subtract(1, "day")) &&
      entryDate.isBefore(endOfWeek.add(1, "day"))
    );
  });

  // --- Build data for graph: total billable & non-billable hours for each week of the month ---
  // Get all weeks in the current month (Monday to Sunday)
  const weeks = [];
  let cursor = startOfMonth.startOf("week"); // Start on Sunday before or on the 1st of month

  while (cursor.isBefore(endOfMonth)) {
    const weekStart = cursor;
    const weekEnd = cursor.endOf("week");
    weeks.push({ weekStart, weekEnd });
    cursor = cursor.add(1, "week");
  }

  // Prepare chart data: for each week, sum billable and non-billable hours
  const chartData = weeks.map(({ weekStart, weekEnd }) => {
    const weekTimesheets = filteredByUser.filter((entry) => {
      const entryDate = dayjs(entry.uploadDate);
      return entryDate.isAfter(weekStart.subtract(1, "day")) && entryDate.isBefore(weekEnd.add(1, "day"));
    });

    const billable = weekTimesheets
      .filter((entry) => entry.isBillable)
      .reduce((sum, entry) => sum + (entry.totalHours || 0), 0);

    const nonBillable = weekTimesheets
      .filter((entry) => !entry.isBillable)
      .reduce((sum, entry) => sum + (entry.totalHours || 0), 0);

    return {
      name: `${weekStart.format("MMM D")} - ${weekEnd.format("MMM D")}`,
      Billable: billable,
      NonBillable: nonBillable,
    };
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Timesheet Analysis</h1>
      <div className={style.chartContainer}>
        <h2>Weekly Billable vs Non-Billable Hours for the Month</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" stroke="#25a372" />
            <YAxis stroke="#25a372" />
            <Tooltip
              wrapperStyle={{ borderRadius: "8px" }}
              contentStyle={{ backgroundColor: "#e6f2f0", borderColor: "#25a372" }}
            />
            <Legend />
            <Bar dataKey="Billable" fill="#25a372" barSize={35} />
            <Bar dataKey="NonBillable" fill="#4caf50" barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <label className={styles.label}>Filter by user:</label>
      <select
        className={styles.select}
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- All Users --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
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
              <td colSpan="8" className={styles.noData}>
                No timesheets found for this week.
              </td>
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
