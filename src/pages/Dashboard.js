import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, DollarSign, Clock } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useTheme } from '../contexts/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { darkMode } = useTheme();
  
  // Mock data for dashboard stats
  const stats = {
    totalVideos: 24,
    totalStudents: 156,
    totalRevenue: 45600,
    totalWatchTime: 1240,
  };

  // Chart colors based on theme
  const chartColors = {
    primary: darkMode ? 'rgba(79, 70, 229, 0.8)' : 'rgba(79, 70, 229, 0.5)',
    primaryBorder: darkMode ? 'rgba(79, 70, 229, 1)' : 'rgba(79, 70, 229, 0.8)',
    accent: darkMode ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255, 107, 107, 0.5)',
    accentBorder: darkMode ? 'rgba(255, 107, 107, 1)' : 'rgba(255, 107, 107, 0.8)',
    secondary: darkMode ? 'rgba(75, 192, 192, 0.8)' : 'rgba(75, 192, 192, 0.5)',
    secondaryBorder: darkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 0.8)',
    text: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    grid: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  // Mock data for revenue chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (KSh)',
        data: [5000, 7500, 12000, 8500, 10000, 15000],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primaryBorder,
        borderWidth: 1,
      },
    ],
  };

  // Mock data for engagement chart
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Video Views',
        data: [120, 190, 300, 250, 280, 350],
        borderColor: chartColors.accentBorder,
        backgroundColor: chartColors.accent,
        tension: 0.4,
      },
      {
        label: 'Live Session Attendees',
        data: [45, 60, 80, 70, 90, 100],
        borderColor: chartColors.secondaryBorder,
        backgroundColor: chartColors.secondary,
        tension: 0.4,
      },
    ],
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

  // Recent activities mock data
  const recentActivities = [
    { id: 1, type: 'video_upload', title: 'Introduction to Digital Marketing', date: '2023-06-15T10:30:00Z' },
    { id: 2, type: 'payment', title: 'Payment received from John Doe', amount: 1500, date: '2023-06-14T14:45:00Z' },
    { id: 3, type: 'live_session', title: 'Q&A Session: Social Media Strategy', date: '2023-06-13T16:00:00Z' },
    { id: 4, type: 'student_signup', title: 'New student: Jane Smith', date: '2023-06-12T09:15:00Z' },
  ];

  // Stat card variants
  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div 
          custom={0} 
          initial="hidden" 
          animate="visible" 
          variants={statCardVariants}
        >
          <Card className="h-full">
            <Card.Content className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mb-4">
                <Video size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalVideos}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Videos</div>
            </Card.Content>
          </Card>
        </motion.div>

        <motion.div 
          custom={1} 
          initial="hidden" 
          animate="visible" 
          variants={statCardVariants}
        >
          <Card className="h-full">
            <Card.Content className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 mb-4">
                <Users size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Students</div>
            </Card.Content>
          </Card>
        </motion.div>

        <motion.div 
          custom={2} 
          initial="hidden" 
          animate="visible" 
          variants={statCardVariants}
        >
          <Card className="h-full">
            <Card.Content className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-300 mb-4">
                <DollarSign size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">KSh {stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
            </Card.Content>
          </Card>
        </motion.div>

        <motion.div 
          custom={3} 
          initial="hidden" 
          animate="visible" 
          variants={statCardVariants}
        >
          <Card className="h-full">
            <Card.Content className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-4">
                <Clock size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalWatchTime}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Watch Hours</div>
            </Card.Content>
          </Card>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card delay={0.4}>
          <Card.Header>
            <Card.Title>Revenue (Last 6 Months)</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <Bar data={revenueData} options={chartOptions} />
          </Card.Content>
        </Card>

        <Card delay={0.5}>
          <Card.Header>
            <Card.Title>Engagement (Last 6 Months)</Card.Title>
          </Card.Header>
          <Card.Content className="p-4">
            <Line data={engagementData} options={chartOptions} />
          </Card.Content>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <Card delay={0.6}>
        <Card.Header>
          <Card.Title>Recent Activities</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="font-medium text-gray-900 dark:text-white">{activity.title}</h6>
                    {activity.type === 'payment' && (
                      <span className="text-sm text-green-600 dark:text-green-400">KSh {activity.amount}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Badge variant={
                      activity.type === 'payment' ? 'success' : 
                      activity.type === 'video_upload' ? 'primary' : 
                      activity.type === 'live_session' ? 'accent' : 
                      'secondary'
                    }>
                      {activity.type.replace('_', ' ')}
                    </Badge>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;