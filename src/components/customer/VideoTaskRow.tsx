
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle, Check, Lock, X } from 'lucide-react';
import { Video } from '@/context/UserDataContext';
import { cn } from '@/lib/utils';

interface VideoTaskRowProps {
  videos: Video[];
  weekNumber: number;
  onVideoComplete: (videoId: string) => void;
}

const VideoTaskRow = ({ videos, weekNumber, onVideoComplete }: VideoTaskRowProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const currentDay = new Date().getDate() % 7 + 1; // Simulate current day of week

  const isVideoAccessible = (video: Video) => {
    if (video.accessType === 'open') return true;
    if (video.accessType === 'daily' && video.dayRequired) {
      return currentDay >= video.dayRequired;
    }
    return false;
  };

  const handleVideoClick = (video: Video) => {
    if (isVideoAccessible(video)) {
      setSelectedVideo(video.id);
      setIsVideoDialogOpen(true);
    }
  };

  const handleVideoComplete = (videoId: string) => {
    onVideoComplete(videoId);
    setIsVideoDialogOpen(false);
    setSelectedVideo(null);
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
                "min-w-[280px] cursor-pointer transition-all",
                accessible ? "hover:shadow-md" : "opacity-50",
                selectedVideo === video.id && "ring-2 ring-blue-500"
              )}
              onClick={() => handleVideoClick(video)}
            >
              <CardContent className="p-4">
                {/* Video Preview Box */}
                <div className="relative mb-3 bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  {accessible ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                      <Lock className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  {video.watched && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video);
                  }}
                  className="w-full"
                >
                  {video.watched ? "Watch Again" : accessible ? "Watch" : "Locked"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedVideo && videos.find(v => v.id === selectedVideo)?.title}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVideoDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <PlayCircle className="h-16 w-16 mx-auto mb-2" />
                <p>Video Player</p>
                <p className="text-sm text-gray-300">
                  {selectedVideo && videos.find(v => v.id === selectedVideo)?.title}
                </p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Duration: {selectedVideo && videos.find(v => v.id === selectedVideo)?.duration}
              </div>
              {selectedVideo && !videos.find(v => v.id === selectedVideo)?.watched && (
                <Button
                  onClick={() => handleVideoComplete(selectedVideo)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark as Watched
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoTaskRow;
