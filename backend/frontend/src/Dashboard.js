import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, ResponsiveContainer, Legend,
} from 'recharts';

const Dashboard = () => {
  const [shipmentCount, setShipmentCount] = useState(0);
  const [userCounts, setUserCounts] = useState({ admin: 0, carrier: 0, user: 0 });
  const [locationData, setLocationData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/shipments');
        const data = await res.json();

        setShipmentCount(data.length);

        // Build data for charts
        const locationCount = {};
        const timeCount = {};

        data.forEach((shipment) => {
          const location = shipment.deliveryAddress || 'Unknown';
          locationCount[location] = (locationCount[location] || 0) + 1;

          const date = new Date(shipment.shipmentDate).toLocaleDateString();
          timeCount[date] = (timeCount[date] || 0) + 1;
        });

        const locData = Object.entries(locationCount).map(([location, count]) => ({
          location,
          count,
        }));
        const timeData = Object.entries(timeCount).map(([date, count]) => ({
          date,
          count,
        }));

        setLocationData(locData);
        setTimeData(timeData);
      } catch (err) {
        console.error('Error fetching shipments:', err);
      }
    };

    const fetchUserCounts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const users = await res.json();
        const counts = { admin: 0, carrier: 0, user: 0 };

        users.forEach(user => {
          if (counts[user.role] !== undefined) {
            counts[user.role]++;
          }
        });

        setUserCounts(counts);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchShipmentData();
    fetchUserCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-box">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <div className="stats-grid">
          <div className="stat-box"><h3>Total Shipments</h3><p>{shipmentCount}</p></div>
          <div className="stat-box"><h3>Total Admins</h3><p>{userCounts.admin}</p></div>
          <div className="stat-box"><h3>Total Carriers</h3><p>{userCounts.carrier}</p></div>
          <div className="stat-box"><h3>Total Users</h3><p>{userCounts.user}</p></div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Shipments by Location</h3>
          <ResponsiveContainer width="30%" height={200}>
            <LineChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis
  tickCount={6}          // Optional: controls number of ticks
  interval="preserveStartEnd"
  domain={[0, 'dataMax + 10']}  // Ensures it goes a bit beyond your max
  tickFormatter={(value) => Math.ceil(value / 10) * 10}
/>

              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Shipments Over Time</h3>
          <ResponsiveContainer width="30%" height={200}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
