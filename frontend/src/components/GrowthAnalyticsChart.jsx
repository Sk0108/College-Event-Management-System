import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EventAnalyticsChart() {
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/events/api/analytics/event-growth/')
      .then(res => {
        setDataPoints(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Event growth analytics fetch error:', err);
        setLoading(false);
      });
  }, []);

  const data = {
    labels: dataPoints.map(p => p.month),
    datasets: [
      {
        label: 'Approved',
        data: dataPoints.map(p => p.approved),
        backgroundColor: 'green'
      },
      {
        label: 'Rejected',
        data: dataPoints.map(p => p.rejected),
        backgroundColor: 'red'
      },
      {
        label: 'Pending',
        data: dataPoints.map(p => p.pending),
        backgroundColor: 'orange'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Event Analytics'
      }
    }
  };

  return (
    <div className="glass-card">
      {loading ? <p>Loading chart...</p> : <Bar data={data} options={options} />}
    </div>
  );
}
