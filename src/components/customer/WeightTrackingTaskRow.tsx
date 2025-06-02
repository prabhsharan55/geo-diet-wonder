import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Weight, Plus, Check } from 'lucide-react';
import { WeightLog } from '@/context/UserDataContext';

interface WeightTrackingTaskRowProps {
  weightLogs: WeightLog[];
  weekNumber: number;
  onAddWeightLog: (weightLog: Omit<WeightLog, 'id'>) => void;
}

const WeightTrackingTaskRow = ({ weightLogs, weekNumber, onAddWeightLog }: WeightTrackingTaskRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [weightData, setWeightData] = useState({
    weight: '',
    notes: '',
    photo: ''
  });

  const handleSubmit = () => {
    onAddWeightLog({
      date: new Date().toISOString().split('T')[0],
      weight: Number(weightData.weight),
      notes: weightData.notes,
      photo: weightData.photo,
      completed: true
    });
    setWeightData({ weight: '', notes: '', photo: '' });
    setIsDialogOpen(false);
  };

  const recentLogs = weightLogs.slice(-7); // Show last 7 entries

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Weight className="h-5 w-5 text-purple-500" />
        Track Weight
        <span className="text-sm font-normal text-gray-500">
          ({weightLogs.length} entries)
        </span>
      </h3>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {/* Add new weight log */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="min-w-[200px] cursor-pointer hover:shadow-md border-dashed border-2">
              <CardContent className="p-4 flex flex-col items-center justify-center h-32">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Log Weight</span>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Track Your Weight</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weightData.weight}
                  onChange={(e) => setWeightData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={weightData.notes}
                  onChange={(e) => setWeightData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any notes about your weight..."
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo (optional)</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setWeightData(prev => ({ ...prev, photo: e.target.files?.[0]?.name || '' }))}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Log Weight
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Existing weight logs */}
        {recentLogs.map((weightLog) => (
          <Card key={weightLog.id} className="min-w-[200px]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-500">{weightLog.date}</span>
              </div>
              <h4 className="font-medium text-lg mb-1">{weightLog.weight} lbs</h4>
              <p className="text-xs text-gray-600 mb-3">{weightLog.notes}</p>
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

export default WeightTrackingTaskRow;
