
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, Check, Lock } from 'lucide-react';
import { Video } from '@/context/UserDataContext';
import { cn } from '@/lib/utils';

interface VideoTaskRowProps {
  videos: Video[];
  weekNumber: number;
  onVideoComplete: (videoId: string) => void;
}

const VideoTaskRow = ({ videos, weekNumber, onVideoComplete }: VideoTaskRowProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const currentDay = new Date().getDate() % 7 + 1; // Simulate current day of week

  const isVideoAccessible = (video: Video) => {
    if (video.accessType === 'open') return true;
    if (video.accessType === 'daily' && video.dayRequired) {
      return currentDay >= video.dayRequired;
    }
    return false;
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <PlayCircle className="h-5 w-5 text-blue-500" />
        Videos
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {videos.map((video) => {
          const accessible = isVideoAccessible(video);
          return (
            <Card 
              key={video.id} 
              className={cn(
                "min-w-[200px] cursor-pointer transition-all",
                accessible ? "hover:shadow-md" : "opacity-50",
                selectedVideo === video.id && "ring-2 ring-blue-500"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {video.watched ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : accessible ? (
                    <PlayCircle className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-500">{video.duration}</span>
                </div>
                <h4 className="font-medium text-sm mb-3">{video.title}</h4>
                <Button
                  size="sm"
                  variant={video.watched ? "outline" : "default"}
                  disabled={!accessible}
                  onClick={() => {
                    if (accessible && !video.watched) {
                      onVideoComplete(video.id);
                    }
                  }}
                  className="w-full"
                >
                  {video.watched ? "Watched" : accessible ? "Watch" : "Locked"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VideoTaskRow;
