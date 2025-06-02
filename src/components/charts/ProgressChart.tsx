
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const ProgressChart = () => {
  const { userData } = useUserData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={userData.progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="weight" orientation="left" />
        <YAxis yAxisId="calories" orientation="right" />
        <Tooltip />
        <Line 
          yAxisId="weight"
          type="monotone" 
          dataKey="weight" 
          stroke="#3A2D70" 
          strokeWidth={2}
          name="Weight (lbs)"
        />
        <Line 
          yAxisId="calories"
          type="monotone" 
          dataKey="calories" 
          stroke="#7072B7" 
          strokeWidth={2}
          name="Calories"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
