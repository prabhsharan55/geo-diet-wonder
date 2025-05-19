import { useNavigate } from "react-router-dom";
import Nutritionists from "../Nutritionists";

// This is now just a wrapper for the main Nutritionists page
// We'll keep the structure consistent with other submenu pages
const NutritionistsFind = () => {
  return <Nutritionists />;
};

export default NutritionistsFind;
