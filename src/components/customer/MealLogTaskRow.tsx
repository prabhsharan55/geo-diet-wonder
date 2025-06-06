import React, { useState } from "react";
import { MealLog } from "@/context/UserDataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MealLogTaskRowProps {
  mealLog: MealLog;
  onEdit: (id: string, mealLog: Partial<MealLog>) => void;
  onDelete: (id: string) => void;
}

const MealLogTaskRow = ({ 
  mealLog, 
  onEdit, 
  onDelete 
}: MealLogTaskRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(mealLog);

  const handleSave = () => {
    onEdit(mealLog.id, {
      meal: editData.meal,
      calories: editData.calories,
      mealType: editData.mealType,
      description: editData.description,
      time: editData.time
    });
    setIsEditing(false);
  };

  return (
    <tr key={mealLog.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <Input
            type="text"
            value={editData.meal}
            onChange={(e) => setEditData({ ...editData, meal: e.target.value })}
          />
        ) : (
          mealLog.meal
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <Input
            type="number"
            value={editData.calories}
            onChange={(e) => setEditData({ ...editData, calories: parseInt(e.target.value) })}
          />
        ) : (
          mealLog.calories
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <Input
            type="text"
            value={editData.mealType || ""}
            onChange={(e) => setEditData({ ...editData, mealType: e.target.value })}
          />
        ) : (
          mealLog.mealType || "-"
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <Input
            type="text"
            value={editData.time || ""}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
          />
        ) : (
          mealLog.time || "-"
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <Textarea
            value={editData.description || ""}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
        ) : (
          mealLog.description || "-"
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(mealLog.id)}>Delete</Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MealLogTaskRow;
