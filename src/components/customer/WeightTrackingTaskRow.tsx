
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Weight, Plus, Check, Camera, Clock } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = () => {
    const now = new Date();
    const currentDateTime = now.toISOString();
    
    onAddWeightLog({
      date: currentDateTime,
      weight: Number(weightData.weight),
      notes: weightData.notes,
      photo: selectedImage ? URL.createObjectURL(selectedImage) : '',
      completed: true
    });
    setWeightData({ weight: '', notes: '', photo: '' });
    setSelectedImage(null);
    setIsDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const recentLogs = weightLogs.slice(-7); // Show last 7 entries

  const formatDateTime = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${formattedDate} at ${formattedTime}`;
  };

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
            <Card className="min-w-[250px] cursor-pointer hover:shadow-md border-dashed border-2">
              <CardContent className="p-4 flex flex-col items-center justify-center h-40">
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
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Weight tracking preview" 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Log Weight
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Existing weight logs */}
        {recentLogs.map((weightLog) => (
          <Card key={weightLog.id} className="min-w-[250px]">
            <CardContent className="p-4">
              {/* Weight Photo */}
              {weightLog.photo && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img 
                    src={weightLog.photo} 
                    alt="Weight tracking"
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatDateTime(weightLog.date)}
                </span>
              </div>
              
              <h4 className="font-medium text-lg mb-1">{weightLog.weight} lbs</h4>
              {weightLog.notes && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{weightLog.notes}</p>
              )}
              
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
