import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { FaUsers, FaChartLine, FaBirthdayCake } from 'react-icons/fa';
import axios from 'axios';

const data = [
  { name: 'Week 1', Billable: 30, NonBillable: 10 },
  { name: 'Week 2', Billable: 45, NonBillable: 12 },
  { name: 'Week 3', Billable: 38, NonBillable: 20 },
  { name: 'Week 4', Billable: 50, NonBillable: 8 },
];

const birthdays = ['Thulisile Dlamini', 'Lebo Mahlangu', 'Kholeka Kok', 'Lungile Khoza', 'Asavela Somabhele'];

const Dashboard = () => {
  const today = new Date().toLocaleDateString();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5282/api/account/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const displayName = user
    ? `${user.firstName || user.username} ${user.lastName || ''}`.trim()
    : 'Loading...';

  return (
    <main className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Welcome, {displayName}</h1>
        {user?.role && <p className={styles.roleText}>Role: {user.role}</p>}
        <p>Today: {today}</p>
      </header>

      <section className={styles.tilesRow}>
        <InfoTile color="#f06292" label="Number of Staff" value="13" icon={<FaUsers size={20} />} />
        <InfoTile color="#9575cd" label="Number of Clients" value="1022" icon={<FaUsers size={20} />} />
        <InfoTile color="#4fc3f7" label="Rate of New Clients" value="13%" icon={<FaChartLine size={20} />} />
      </section>

      <section className={styles.chartBirthdaySection}>
        <div className={styles.birthdayCard}>
          <h3><FaBirthdayCake /> This month Birthdays</h3>
          <p>Let’s wish a happy birthday to these clients:</p>
          <ul>
            {birthdays.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>
        <div className={styles.chartContainer}>
          <h2>Your Production for the Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#25a372" />
              <YAxis stroke="#25a372" />
              <Tooltip
                wrapperStyle={{ borderRadius: '8px' }}
                contentStyle={{ backgroundColor: '#e6f2f0', borderColor: '#25a372' }}
              />
              <Legend />
              <Bar dataKey="Billable" fill="#25a372" barSize={35} />
              <Bar dataKey="NonBillable" fill="#4caf50" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
};

const InfoTile = ({ color, label, value, icon }) => (
  <div className={styles.infoTile} style={{ backgroundColor: color }}>
    <div>
      <p className={styles.infoLabel}>{label}</p>
      <p className={styles.infoValue}>{value}</p>
    </div>
    <div>{icon}</div>
  </div>
);

export default Dashboard;
