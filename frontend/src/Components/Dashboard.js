import React from 'react';
import DashboardCSS from './Dashboard.module.css';
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

const Dashboard = () => {
  const today = new Date().toLocaleDateString();

  const data = [
    { name: 'Week 1', Billable: 30, NonBillable: 10 },
    { name: 'Week 2', Billable: 45, NonBillable: 12 },
    { name: 'Week 3', Billable: 38, NonBillable: 20 },
    { name: 'Week 4', Billable: 50, NonBillable: 8 },
  ];

  const birthdays = ['Thulisile Dlamini', 'Lebo Mahlangu'];

  return (
    <div className={DashboardCSS['dashboard-container']}>
      <h1 className={DashboardCSS['heading']}>Welcome Amanda Mokhachane</h1>
      <p className={DashboardCSS['date']}>Today's date: {today}</p>

      <div className={DashboardCSS['widgets']}>
        <div className={DashboardCSS['birthday-message']}>
          <h3 className={DashboardCSS['birthday-heading']}>
            🥳 Let’s wish a happy birthday to:
          </h3>
          <div className={DashboardCSS['birthday-names']}>
            {birthdays.map((name, index) => (
              <span key={index} className={DashboardCSS['birthday-tag']}>
                🎂 {name}
              </span>
            ))}
          </div>
        </div>

        <div className={`${DashboardCSS['card']} ${DashboardCSS['clients']}`}>
          <h3>Total Clients</h3>
          <p>25</p>
        </div>
        <div className={`${DashboardCSS['card']} ${DashboardCSS['users']}`}>
          <h3>Active Users</h3>
          <p>8</p>
        </div>
        <div className={`${DashboardCSS['card']} ${DashboardCSS['timesheets']}`}>
          <h3>Pending Timesheets</h3>
          <p>3</p>
        </div>
      </div>

      <div className={DashboardCSS['chart-container']}>
        <h2 className={DashboardCSS['chart-title']}>Your Production for the month</h2>
        <ResponsiveContainer width="80%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
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
      </div>
    </div>
  );
};

export default Dashboard;
