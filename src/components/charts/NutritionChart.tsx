
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/context/UserDataContext';

const NutritionChart = () => {
  const { userData } = useUserData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={userData.nutritionData}>
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
