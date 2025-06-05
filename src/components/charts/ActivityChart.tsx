
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const ActivityChart = () => {
  const { userData } = useUserData();

  // Format data for the chart
  const chartData = userData.activityData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    steps: entry.steps,
    minutes: entry.minutes
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        <p>No activity data available. Add some entries to see your chart!</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="steps" orientation="left" />
        <YAxis yAxisId="minutes" orientation="right" />
        <Tooltip />
        <Area 
          yAxisId="steps"
          type="monotone" 
          dataKey="steps" 
          stackId="1" 
          stroke="#3A2D70" 
          fill="#3A2D70"
          name="Steps"
        />
        <Area 
          yAxisId="minutes"
          type="monotone" 
          dataKey="minutes" 
          stackId="2" 
          stroke="#7072B7" 
          fill="#7072B7"
          name="Exercise Minutes"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
