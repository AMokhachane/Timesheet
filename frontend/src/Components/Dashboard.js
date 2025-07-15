import React from 'react';
import DashboardCSS from './Dashboard.module.css';

const Dashboard = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className={DashboardCSS['dashboard-container']}>
      <h1 className={DashboardCSS['heading']}>Welcome to the Dashboard</h1>
      <p className={DashboardCSS['date']}>Today's date: {today}</p>

      <div className={DashboardCSS['widgets']}>
        <div className={DashboardCSS['card']}>
          <h3>Total Clients</h3>
          <p>25</p>
        </div>
        <div className={DashboardCSS['card']}>
          <h3>Active Users</h3>
          <p>8</p>
        </div>
        <div className={DashboardCSS['card']}>
          <h3>Pending Timesheets</h3>
          <p>3</p>
        </div>
        <div className={DashboardCSS['card']}>
          <h3>Birthdays This Month</h3>
          <p>2</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
