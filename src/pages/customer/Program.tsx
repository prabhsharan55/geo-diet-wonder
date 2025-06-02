
import { useState, useEffect } from "react";
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserData } from "@/context/UserDataContext";
import AnimatedProgressBar from "@/components/customer/AnimatedProgressBar";
import VideoTaskRow from "@/components/customer/VideoTaskRow";
import MealLogTaskRow from "@/components/customer/MealLogTaskRow";
import WeightTrackingTaskRow from "@/components/customer/WeightTrackingTaskRow";

const Program = () => {
  const { userData, markVideoWatched, addMealLog, addWeightLog, completeWeek } = useUserData();
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(false);
  const [showWeekCompleteAnimation, setShowWeekCompleteAnimation] = useState(false);
  
  const { program } = userData;
  const currentWeek = program.currentWeek;
  const totalWeeks = program.totalWeeks;

  // Check if user just completed a week (simulate checking on page load)
  useEffect(() => {
    // This would normally check if user just completed tasks and trigger animation
    const hasJustCompletedWeek = localStorage.getItem('weekJustCompleted');
    if (hasJustCompletedWeek) {
      setShouldAnimateProgress(true);
      localStorage.removeItem('weekJustCompleted');
    }
  }, []);

  const getWeekStatus = (weekNumber: number) => {
    if (weekNumber < currentWeek) return "completed";
    if (weekNumber === currentWeek) return "current";
    return "locked";
  };

  const calculateWeekCompletion = (week: any) => {
    const totalTasks = week.tasks.videos.length + 7 + 7; // videos + daily meals + weekly weights
    const completedVideos = week.tasks.videos.filter((v: any) => v.watched).length;
    const completedMeals = week.tasks.mealLogs.length;
    const completedWeights = week.tasks.weightLogs.length;
    
    return Math.round(((completedVideos + completedMeals + completedWeights) / totalTasks) * 100);
  };

  const canCompleteWeek = (week: any) => {
    const allVideosWatched = week.tasks.videos.every((v: any) => v.watched);
    const hasMealLogs = week.tasks.mealLogs.length >= 7; // At least 7 meal logs
    const hasWeightLogs = week.tasks.weightLogs.length >= 1; // At least 1 weight log
    
    return allVideosWatched && hasMealLogs && hasWeightLogs;
  };

  const handleCompleteWeek = (weekNumber: number) => {
    completeWeek(weekNumber);
    localStorage.setItem('weekJustCompleted', 'true');
    setShowWeekCompleteAnimation(true);
    setTimeout(() => setShowWeekCompleteAnimation(false), 3000);
  };

  const overallCompletion = Math.round(((currentWeek - 1) / totalWeeks) * 100);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Program</h2>
          <p className="text-gray-500 mt-1">Your {totalWeeks}-week {program.planName} journey</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Program Progress</span>
              <span className="text-sm font-medium bg-[#F4D374] text-[#160041] py-1 px-3 rounded-full">
                Week {currentWeek} of {totalWeeks}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{overallCompletion}%</span>
            </div>
            <AnimatedProgressBar 
              value={overallCompletion} 
              userName={userData.name}
              shouldAnimate={shouldAnimateProgress}
              onAnimationComplete={() => setShouldAnimateProgress(false)}
            />
          </CardContent>
        </Card>
        
        <Tabs defaultValue={`week-${currentWeek}`} className="w-full">
          <TabsList className="w-full flex overflow-x-auto">
            {program.weeks.map((week) => {
              const status = getWeekStatus(week.weekNumber);
              return (
                <TabsTrigger 
                  key={`week-${week.weekNumber}`} 
                  value={`week-${week.weekNumber}`}
                  disabled={status === "locked"}
                  className={cn(
                    "flex-1",
                    status === "completed" && "bg-green-100 data-[state=active]:bg-green-200"
                  )}
                >
                  Week {week.weekNumber}
                  {status === "completed" && <Check className="ml-2 h-4 w-4 text-green-500" />}
                  {status === "locked" && <Lock className="ml-2 h-4 w-4" />}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {program.weeks.map((week) => {
            const status = getWeekStatus(week.weekNumber);
            const completion = calculateWeekCompletion(week);
            const canComplete = canCompleteWeek(week);
            
            return (
              <TabsContent key={`content-${week.weekNumber}`} value={`week-${week.weekNumber}`} className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Week {week.weekNumber} Overview</span>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                          {completion}% Complete
                        </div>
                        {status === "current" && canComplete && (
                          <Button 
                            onClick={() => handleCompleteWeek(week.weekNumber)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete Week
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      {status === "locked" 
                        ? `This content will be unlocked when you reach Week ${week.weekNumber}` 
                        : status === "completed"
                          ? "You've completed this week! Review the content any time."
                          : week.focus}
                    </p>
                    
                    {/* Task Grid */}
                    {status !== "locked" && (
                      <div className="space-y-6">
                        <VideoTaskRow 
                          videos={week.tasks.videos}
                          weekNumber={week.weekNumber}
                          onVideoComplete={(videoId) => markVideoWatched(week.weekNumber, videoId)}
                        />
                        
                        <MealLogTaskRow 
                          mealLogs={week.tasks.mealLogs}
                          weekNumber={week.weekNumber}
                          onAddMealLog={(mealLog) => addMealLog(week.weekNumber, mealLog)}
                        />
                        
                        <WeightTrackingTaskRow 
                          weightLogs={week.tasks.weightLogs}
                          weekNumber={week.weekNumber}
                          onAddWeightLog={(weightLog) => addWeightLog(week.weekNumber, weightLog)}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {status !== "locked" && week.recommendedVideos.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recommended Videos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {week.recommendedVideos.map((video) => (
                          <div key={video.id} className="flex items-center gap-3">
                            <PlayCircle className="h-5 w-5 text-[#8D97DE]" />
                            <span className="flex-1">{video.title}</span>
                            <span className="text-sm text-gray-500">{video.duration}</span>
                            <Button size="sm" variant="outline">Watch</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Week completion celebration */}
        {showWeekCompleteAnimation && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Week Completed!</h2>
              <p className="text-lg text-gray-600">Great job! Moving to the next week...</p>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Program;
