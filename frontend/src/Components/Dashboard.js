import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaUsers, FaClipboardList, FaBirthdayCake } from 'react-icons/fa';

const data = [
  { name: 'Week 1', Billable: 30, NonBillable: 10 },
  { name: 'Week 2', Billable: 45, NonBillable: 12 },
  { name: 'Week 3', Billable: 38, NonBillable: 20 },
  { name: 'Week 4', Billable: 50, NonBillable: 8 },
];

const birthdays = ['Thulisile Dlamini', 'Lebo Mahlangu'];

const Dashboard = () => {
  const today = new Date().toLocaleDateString();

  return (
    <main style={{ padding: '2rem 3rem', backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid #ddd',
        paddingBottom: '1rem',
      }}>
        <h1 style={{ color: '#1e2a38', fontSize: '2.2rem' }}>Welcome, Amanda Mokhachane</h1>
        <p style={{ fontSize: '1rem', color: '#6b7a8f' }}>Today: {today}</p>
      </header>

      {/* Widgets */}
      <section style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {/* Birthdays */}
        <div style={{
          flex: '1 1 300px',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: 12,
          boxShadow: '0 4px 10px rgb(0 0 0 / 0.05)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: '600', marginBottom: '1rem', color: '#25a372' }}>
            <FaBirthdayCake /> Monthly Birthdays
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {birthdays.map((name, i) => (
              <span key={i} style={{
                backgroundColor: '#e0f2f1',
                color: '#00796b',
                padding: '0.4rem 0.9rem',
                borderRadius: 20,
                fontWeight: '500',
                boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
                whiteSpace: 'nowrap',
              }}>
                🎂 {name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <StatCard icon={<FaUsers size={30} color="#4caf50" />} label="Active Users" value="8" />
        <StatCard icon={<FaClipboardList size={30} color="#25a372" />} label="Pending Timesheets" value="3" />
        <StatCard icon={<FaUsers size={30} color="#388e3c" />} label="Total Clients" value="25" />
      </section>

      {/* Chart */}
      <section style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '2rem',
        boxShadow: '0 6px 15px rgb(0 0 0 / 0.1)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1e2a38' }}>
          Your Production for the Month
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" stroke="#25a372" />
            <YAxis stroke="#25a372" />
            <Tooltip
              wrapperStyle={{ borderRadius: '8px' }}
              contentStyle={{ backgroundColor: '#e6f2f0', borderColor: '#25a372' }}
            />
            <Legend />
            <Bar dataKey="Billable" fill="#25a372" barSize={40} />
            <Bar dataKey="NonBillable" fill="#4caf50" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
};

// Reusable stat card component
const StatCard = ({ icon, label, value }) => (
  <div style={{
    flex: '1 1 200px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgb(0 0 0 / 0.07)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'default',
    transition: 'transform 0.2s ease',
  }}
    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
  >
    <div>{icon}</div>
    <div>
      <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#25a372' }}>{value}</p>
    </div>
  </div>
);

export default Dashboard;
