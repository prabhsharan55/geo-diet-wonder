
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const NutritionChart = () => {
  const { userData } = useUserData();

  // Format data for the chart
  const chartData = userData.nutritionData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    protein: entry.protein,
    carbs: entry.carbs,
    fats: entry.fats
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        <p>No nutrition data available. Add some entries to see your chart!</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="protein" fill="#3A2D70" name="Protein (g)" />
        <Bar dataKey="carbs" fill="#7072B7" name="Carbs (g)" />
        <Bar dataKey="fats" fill="#8D97DE" name="Fats (g)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutritionChart;
