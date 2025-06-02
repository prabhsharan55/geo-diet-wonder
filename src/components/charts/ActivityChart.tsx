
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const ActivityChart = () => {
  const { userData } = useUserData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={userData.activityData}>
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
