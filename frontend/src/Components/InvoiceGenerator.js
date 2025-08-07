import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./InvoiceGenerator.module.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

jsPDF.API.autoTable = autoTable;

const BILLING_RATE = 500;

const InvoiceGenerator = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const startOfWeek = dayjs().add(weekOffset, "week").startOf("week");
  const endOfWeek = dayjs().add(weekOffset, "week").endOf("week");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/clients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/timesheet`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTimesheets(res.data))
      .catch((error) =>
        console.error("Error fetching timesheets:", error.response || error.message)
      );
  }, []);

  const filteredTimesheets = timesheets.filter((entry) => {
    const uploadDate = dayjs(entry.uploadDate);
    return uploadDate.isAfter(startOfWeek.subtract(1, "day")) && uploadDate.isBefore(endOfWeek.add(1, "day"));
  });

  const handleGeneratePreview = () => {
    if (!selectedClientId || !startDate || !endDate) return;

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const filtered = timesheets.filter((entry) => {
      const entryDate = dayjs(entry.uploadDate);
      return (
        entry.client?.id === selectedClientId &&
        entryDate.isSameOrAfter(start) &&
        entryDate.isSameOrBefore(end)
      );
    });

    setFilteredData(filtered);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 14, 16);
    autoTable(doc, {
      head: [["Date", "Project", "Task", "Hours"]],
      body: filteredData.map((entry) => [
        new Date(entry.uploadDate).toLocaleDateString(),
        entry.projectName,
        entry.taskDescription,
        entry.totalHours,
      ]),
    });

    const total = filteredData.reduce((sum, e) => sum + e.totalHours, 0) * BILLING_RATE;
    doc.text(`Total: R${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("invoice.pdf");
  };

  return (
    <div className={styles["invoice-container"]}>
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

      <h2 className={styles["section-title"]}>Generate Invoice</h2>

      <label className={styles.label}>Choose Client:</label>
      <select
        className={styles.select}
        value={selectedClientId}
        onChange={(e) => setSelectedClientId(e.target.value)}
      >
        <option value="">-- Select Client --</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.companyName}
          </option>
        ))}
      </select>

      <label className={styles.label}>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={styles.input}
      />

      <label className={styles.label}>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={styles.input}
      />

      <button
        onClick={handleGeneratePreview}
        className={styles.buttonPrimary}
      >
        Generate Preview
      </button>

      {filteredData.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 className={styles["section-title"]}>Invoice Preview</h3>

          <table className={styles["preview-table"]}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Task</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry.id}>
                  <td>{new Date(entry.uploadDate).toLocaleDateString()}</td>
                  <td>{entry.projectName}</td>
                  <td>{entry.taskDescription}</td>
                  <td>{entry.totalHours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <strong>Total Hours:</strong>{" "}
            {filteredData.reduce((sum, e) => sum + e.totalHours, 0)}
          </p>
          <p>
            <strong>Rate:</strong> R{BILLING_RATE}/hour
          </p>
          <p>
            <strong>Total:</strong> R
            {(
              filteredData.reduce((sum, e) => sum + e.totalHours, 0) * BILLING_RATE
            ).toFixed(2)}
          </p>

          <button
            onClick={handlePrint}
            className={styles.buttonSecondary}
          >
            Download Invoice PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
