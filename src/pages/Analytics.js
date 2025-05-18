import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useTheme } from '../contexts/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Date range state
  const [dateRange, setDateRange] = useState('month');
  const { darkMode } = useTheme();
  
  // Chart colors based on theme
  const chartColors = {
    primary: darkMode ? 'rgba(79, 70, 229, 0.8)' : 'rgba(79, 70, 229, 0.5)',
    primaryBorder: darkMode ? 'rgba(79, 70, 229, 1)' : 'rgba(79, 70, 229, 0.8)',
    accent: darkMode ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255, 107, 107, 0.5)',
    accentBorder: darkMode ? 'rgba(255, 107, 107, 1)' : 'rgba(255, 107, 107, 0.8)',
    secondary: darkMode ? 'rgba(75, 192, 192, 0.8)' : 'rgba(75, 192, 192, 0.5)',
    secondaryBorder: darkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 0.8)',
    yellow: darkMode ? 'rgba(255, 206, 86, 0.8)' : 'rgba(255, 206, 86, 0.5)',
    yellowBorder: darkMode ? 'rgba(255, 206, 86, 1)' : 'rgba(255, 206, 86, 0.8)',
    purple: darkMode ? 'rgba(153, 102, 255, 0.8)' : 'rgba(153, 102, 255, 0.5)',
    purpleBorder: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 0.8)',
    text: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    grid: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: chartColors.text,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: chartColors.grid,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: chartColors.grid,
        },
        ticks: {
          color: chartColors.text,
        },
      },
      y: {
        grid: {
          color: chartColors.grid,
        },
        ticks: {
          color: chartColors.text,
        },
      },
    },
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartColors.text,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: chartColors.grid,
        borderWidth: 1,
      },
    },
  };
  
  // Mock data for charts
  const revenueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue (KSh)',
        data: [12000, 15000, 10000, 18000],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primaryBorder,
        borderWidth: 1,
      },
    ],
  };

  const viewsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Video Views',
        data: [320, 450, 280, 390],
        borderColor: chartColors.accentBorder,
        backgroundColor: chartColors.accent,
        tension: 0.4,
      },
    ],
  };

  const contentTypeData = {
    labels: ['Free Videos', 'Paid Videos', 'Live Sessions'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: [
          chartColors.secondary,
          chartColors.primary,
          chartColors.yellow,
        ],
        borderColor: [
          chartColors.secondaryBorder,
          chartColors.primaryBorder,
          chartColors.yellowBorder,
        ],
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Watch Time (minutes)',
        data: [18, 22, 20, 25],
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purpleBorder,
        borderWidth: 1,
      },
    ],
  };

  // Mock data for top performing content
  const topContent = [
    {
      id: 1,
      title: 'Introduction to Digital Marketing',
      type: 'Video',
      views: 320,
      revenue: 16000,
      avgWatchTime: '32:15',
    },
    {
      id: 2,
      title: 'Mathematics: Algebra Basics',
      type: 'Video',
      views: 280,
      revenue: 21000,
      avgWatchTime: '45:30',
    },
    {
      id: 3,
      title: 'Q&A Session: Digital Marketing Strategies',
      type: 'Live Session',
      views: 150,
      revenue: 4500,
      avgWatchTime: '58:20',
    },
    {
      id: 4,
      title: 'Effective Public Speaking',
      type: 'Video',
      views: 210,
      revenue: 12600,
      avgWatchTime: '28:45',
    },
    {
      id: 5,
      title: 'Sunday Virtual Service',
      type: 'Live Session',
      views: 180,
      revenue: 0,
      avgWatchTime: '65:10',
    },
  ];

  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // In a real app, this would trigger an API call to fetch data for the selected range
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Analytics</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <Button 
            variant={dateRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange('week')}
          >
            Last 7 days
          </Button>
          <Button 
            variant={dateRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange('month')}
          >
            Last 30 days
          </Button>
          <Button 
            variant={dateRange === 'quarter' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange('quarter')}
          >
            Last 90 days
          </Button>
          <Button 
            variant={dateRange === 'year' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleDateRangeChange('year')}
          >
            Last 365 days
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card delay={0.1}>
          <Card.Header>
            <Card.Title>Revenue</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <Bar data={revenueData} options={chartOptions} />
          </Card.Content>
        </Card>

        <Card delay={0.2}>
          <Card.Header>
            <Card.Title>Video Views</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <Line data={viewsData} options={chartOptions} />
          </Card.Content>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card delay={0.3}>
          <Card.Header>
            <Card.Title>Content Type Distribution</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <div className="h-[300px]">
              <Pie data={contentTypeData} options={pieChartOptions} />
            </div>
          </Card.Content>
        </Card>

        <Card delay={0.4}>
          <Card.Header>
            <Card.Title>Engagement</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <Bar data={engagementData} options={chartOptions} />
          </Card.Content>
        </Card>
      </div>
      
      <Card delay={0.5}>
        <Card.Header>
          <Card.Title>Top Performing Content</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Views</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Revenue (KSh)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Watch Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {topContent.map((content, index) => (
                  <motion.tr 
                    key={content.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{content.title}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={content.type === 'Video' ? 'primary' : 'accent'}>
                        {content.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{content.views}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{content.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{content.avgWatchTime}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Analytics;