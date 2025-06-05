
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const ProgressChart = () => {
  const { userData } = useUserData();

  if (userData.progressData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>No progress data available yet.</p>
          <p className="text-sm mt-2">Add nutrition entries to see your progress over time!</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={userData.progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="weight" orientation="left" domain={['dataMin - 5', 'dataMax + 5']} />
        <YAxis yAxisId="calories" orientation="right" />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="weight"
          type="monotone" 
          dataKey="weight" 
          stroke="#3A2D70" 
          strokeWidth={2}
          name="Weight (lbs)"
        />
        <Line 
          yAxisid="calories"
          type="monotone" 
          dataKey="calories" 
          stroke="#7072B7" 
          strokeWidth={2}
          name="Avg Daily Calories"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
