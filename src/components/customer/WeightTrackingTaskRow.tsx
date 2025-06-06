import React, { useState } from "react";
import { WeightLog } from "@/context/UserDataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface WeightTrackingTaskRowProps {
  weightLog: WeightLog;
  onEdit: (id: string, weightLog: Partial<WeightLog>) => void;
  onDelete: (id: string) => void;
}

const WeightTrackingTaskRow = ({ 
  weightLog, 
  onEdit, 
  onDelete 
}: WeightTrackingTaskRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(weightLog);

  const handleSave = () => {
    onEdit(weightLog.id, {
      weight: editData.weight,
      notes: editData.notes
    });
    setIsEditing(false);
  };

  return (
    <li className="py-4 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div>
          <Label htmlFor={`weight-${weightLog.id}`}>Weight</Label>
          {isEditing ? (
            <Input
              type="number"
              id={`weight-${weightLog.id}`}
              value={editData.weight}
              onChange={(e) => setEditData({ ...editData, weight: parseFloat(e.target.value) })}
            />
          ) : (
            <p>{weightLog.weight} lbs</p>
          )}
        </div>
        <div>
          <Label htmlFor={`notes-${weightLog.id}`}>Notes</Label>
          {isEditing ? (
            <Textarea
              id={`notes-${weightLog.id}`}
              value={editData.notes || ""}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            />
          ) : (
            <p>{weightLog.notes || "No notes"}</p>
          )}
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(weightLog.id)}>Delete</Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default WeightTrackingTaskRow;
