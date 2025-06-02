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
  const { userData, markVideoWatched, addMealLog, addWeightLog, editMealLog, deleteMealLog, editWeightLog, deleteWeightLog, completeWeek } = useUserData();
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(false);
  const [showWeekCompleteAnimation, setShowWeekCompleteAnimation] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  
  const { program } = userData;
  const currentWeek = program.currentWeek;
  const totalWeeks = program.totalWeeks;

  // Get current date info
  const currentDate = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = dayNames[currentDate.getDay()];
  const currentDayOfWeek = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // Convert Sunday (0) to 7
  
  // Check if a day tab should be accessible based on current system day
  const isDayAccessible = (weekNumber: number, dayNumber: number) => {
    if (weekNumber < currentWeek) return true; // Past weeks are fully accessible
    if (weekNumber > currentWeek) return false; // Future weeks are locked
    if (weekNumber === currentWeek) {
      return dayNumber <= currentDayOfWeek; // Current week: only current and past days
    }
    return false;
  };

  // Check if it's current day for edit/delete permissions
  const isCurrentDay = (weekNumber: number, dayNumber: number) => {
    return weekNumber === currentWeek && dayNumber === currentDayOfWeek;
  };

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

  // Generate day tabs for any week
  const generateDayTabs = (weekNumber: number) => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const dayName = dayNames[i % 7]; // Start from Monday
      const accessible = isDayAccessible(weekNumber, i);
      days.push({
        day: i,
        name: dayName,
        accessible
      });
    }
    return days;
  };

  const formatDateWithDay = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentDate.toLocaleDateString('en-US', options);
  };

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
            <div className="max-w-xs">
              <AnimatedProgressBar 
                value={overallCompletion} 
                userName={userData.name}
                shouldAnimate={shouldAnimateProgress}
                onAnimationComplete={() => setShouldAnimateProgress(false)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue={`week-${currentWeek}`} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="w-full min-w-max grid" style={{ gridTemplateColumns: `repeat(${totalWeeks}, minmax(80px, 1fr))` }}>
              {program.weeks.map((week) => {
                const status = getWeekStatus(week.weekNumber);
                return (
                  <TabsTrigger 
                    key={`week-${week.weekNumber}`} 
                    value={`week-${week.weekNumber}`}
                    disabled={status === "locked"}
                    className={cn(
                      "text-xs px-3 py-2 min-w-[80px]",
                      status === "completed" && "bg-green-100 data-[state=active]:bg-green-200"
                    )}
                  >
                    <span className="truncate">
                      Week {week.weekNumber}
                      {status === "completed" && <Check className="ml-1 h-3 w-3 text-green-500 inline" />}
                      {status === "locked" && <Lock className="ml-1 h-3 w-3 inline" />}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          
          {program.weeks.map((week) => {
            const status = getWeekStatus(week.weekNumber);
            const completion = calculateWeekCompletion(week);
            const canComplete = canCompleteWeek(week);
            const isCurrentWeek = status === "current";
            
            return (
              <TabsContent key={`content-${week.weekNumber}`} value={`week-${week.weekNumber}`} className="mt-6 space-y-6">
                {/* Show current date and day for current week */}
                {isCurrentWeek && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg text-blue-800">Today</h3>
                        <p className="text-blue-600">{formatDateWithDay()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Day tabs for all weeks */}
                <Tabs defaultValue="day-1" className="w-full">
                  <TabsList className="w-full grid grid-cols-7">
                    {generateDayTabs(week.weekNumber).map((day) => (
                      <TabsTrigger 
                        key={`day-${day.day}`} 
                        value={`day-${day.day}`}
                        disabled={!day.accessible}
                        className={cn(
                          "text-xs px-2 py-1",
                          !day.accessible && "opacity-50"
                        )}
                        onClick={() => day.accessible && setSelectedDay(day.day)}
                      >
                        <span className="truncate">
                          Day {day.day}
                          <br />
                          <span className="text-xs text-gray-500">{day.name}</span>
                          {!day.accessible && <Lock className="h-3 w-3 inline ml-1" />}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {generateDayTabs(week.weekNumber).map((day) => (
                    <TabsContent key={`day-content-${day.day}`} value={`day-${day.day}`} className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Day {day.day} - {day.name} Tracking
                            {isCurrentWeek && day.day === currentDayOfWeek && (
                              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Today</span>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <VideoTaskRow 
                              videos={week.tasks.videos}
                              weekNumber={week.weekNumber}
                              onVideoComplete={(videoId) => markVideoWatched(week.weekNumber, videoId)}
                            />
                            
                            <MealLogTaskRow 
                              mealLogs={week.tasks.mealLogs.filter(log => 
                                new Date(log.date).getDay() === (day.day % 7)
                              )}
                              weekNumber={week.weekNumber}
                              onAddMealLog={(mealLog) => addMealLog(week.weekNumber, mealLog)}
                              onEditMealLog={(mealLogId, updatedMealLog) => editMealLog(week.weekNumber, mealLogId, updatedMealLog)}
                              onDeleteMealLog={(mealLogId) => deleteMealLog(week.weekNumber, mealLogId)}
                              canEdit={isCurrentDay(week.weekNumber, day.day)}
                            />
                            
                            <WeightTrackingTaskRow 
                              weightLogs={week.tasks.weightLogs}
                              weekNumber={week.weekNumber}
                              onAddWeightLog={(weightLog) => addWeightLog(week.weekNumber, weightLog)}
                              onEditWeightLog={(weightLogId, updatedWeightLog) => editWeightLog(week.weekNumber, weightLogId, updatedWeightLog)}
                              onDeleteWeightLog={(weightLogId) => deleteWeightLog(week.weekNumber, weightLogId)}
                              canEdit={isCurrentDay(week.weekNumber, day.day)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Week completion button for current week */}
                {status === "current" && canComplete && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Button 
                        onClick={() => handleCompleteWeek(week.weekNumber)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete Week {week.weekNumber}
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
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
