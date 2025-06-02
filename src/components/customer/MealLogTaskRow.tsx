import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Utensils, Plus, Check } from 'lucide-react';
import { MealLog } from '@/context/UserDataContext';

interface MealLogTaskRowProps {
  mealLogs: MealLog[];
  weekNumber: number;
  onAddMealLog: (mealLog: Omit<MealLog, 'id'>) => void;
}

const MealLogTaskRow = ({ mealLogs, weekNumber, onAddMealLog }: MealLogTaskRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mealData, setMealData] = useState({
    mealType: '',
    description: '',
    time: '',
    photo: ''
  });

  const handleSubmit = () => {
    onAddMealLog({
      date: new Date().toISOString().split('T')[0],
      mealType: mealData.mealType,
      description: mealData.description,
      time: mealData.time,
      photo: mealData.photo,
      completed: true
    });
    setMealData({ mealType: '', description: '', time: '', photo: '' });
    setIsDialogOpen(false);
  };

  const todayLogs = mealLogs.filter(log => 
    log.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Utensils className="h-5 w-5 text-green-500" />
        Log Daily Meals
        <span className="text-sm font-normal text-gray-500">
          ({todayLogs.length} logged today)
        </span>
      </h3>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {/* Add new meal log */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="min-w-[200px] cursor-pointer hover:shadow-md border-dashed border-2">
              <CardContent className="p-4 flex flex-col items-center justify-center h-32">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Meal</span>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Your Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="mealType">Meal Type</Label>
                <Input
                  id="mealType"
                  value={mealData.mealType}
                  onChange={(e) => setMealData(prev => ({ ...prev, mealType: e.target.value }))}
                  placeholder="e.g., Breakfast, Lunch, Dinner"
                />
              </div>
              <div>
                <Label htmlFor="description">What did you eat?</Label>
                <Textarea
                  id="description"
                  value={mealData.description}
                  onChange={(e) => setMealData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your meal..."
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={mealData.time}
                  onChange={(e) => setMealData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo (optional)</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMealData(prev => ({ ...prev, photo: e.target.files?.[0]?.name || '' }))}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Log Meal
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Existing meal logs */}
        {todayLogs.map((meal) => (
          <Card key={meal.id} className="min-w-[200px]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-500">{meal.time}</span>
              </div>
              <h4 className="font-medium text-sm mb-1">{meal.mealType}</h4>
              <p className="text-xs text-gray-600 mb-3">{meal.description}</p>
              <Button size="sm" variant="outline" className="w-full" disabled>
                Logged
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealLogTaskRow;
