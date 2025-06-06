// @ts-nocheck

import { useState, useEffect } from "react";
import { useUserData } from "@/context/UserDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Clock, Play, Book } from "lucide-react";
import CustomerLayout from "@/components/customer/CustomerLayout";
import VideoTaskRow from "@/components/customer/VideoTaskRow";
import MealLogTaskRow from "@/components/customer/MealLogTaskRow";
import WeightTrackingTaskRow from "@/components/customer/WeightTrackingTaskRow";

interface Video {
  id: string;
  title: string;
  url: string;
  weekNumber: number;
  completed: boolean;
}

interface MealLog {
  id: string;
  date: string;
  meal: string;
  calories: number;
  weekNumber: number;
}

interface WeightLog {
  id: string;
  date: string;
  weight: number;
  weekNumber: number;
}

// Mock data for videos
const mockVideos: Video[] = [
  {
    id: "video-1",
    title: "Introduction to Metabolism",
    url: "https://example.com/video1",
    weekNumber: 1,
    completed: true,
  },
  {
    id: "video-2",
    title: "Understanding Macronutrients",
    url: "https://example.com/video2",
    weekNumber: 1,
    completed: false,
  },
  {
    id: "video-3",
    title: "Advanced Nutrition Science",
    url: "https://example.com/video3",
    weekNumber: 2,
    completed: false,
  },
];

// Mock data for meal logs
const mockMealLogs: MealLog[] = [
  {
    id: "meal-1",
    date: "2024-07-15",
    meal: "Breakfast",
    calories: 300,
    weekNumber: 1,
  },
  {
    id: "meal-2",
    date: "2024-07-15",
    meal: "Lunch",
    calories: 500,
    weekNumber: 1,
  },
  {
    id: "meal-3",
    date: "2024-07-22",
    meal: "Dinner",
    calories: 700,
    weekNumber: 2,
  },
];

// Mock data for weight logs
const mockWeightLogs: WeightLog[] = [
  {
    id: "weight-1",
    date: "2024-07-15",
    weight: 150,
    weekNumber: 1,
  },
  {
    id: "weight-2",
    date: "2024-07-22",
    weight: 148,
    weekNumber: 2,
  },
];

const Program = () => {
  const { userData, updateUserData } = useUserData();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [videos, setVideos] = useState(mockVideos);
  const [mealLogs, setMealLogs] = useState(mockMealLogs);
  const [weightLogs, setWeightLogs] = useState(mockWeightLogs);

  useEffect(() => {
    // Mock function to simulate fetching user data
    const fetchUserData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateUserData({
        currentWeek: 3,
        daysRemaining: 42,
        completedTasks: 15,
        totalTasks: 30,
      });
    };

    fetchUserData();
  }, [updateUserData]);

  const handleVideoComplete = (videoId: string) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId ? { ...video, completed: true } : video
      )
    );
  };

  const handleVideoPlay = (videoId: string) => {
    console.log(`Playing video with ID: ${videoId}`);
  };

  const handleAddMealLog = (newMealLog: MealLog) => {
    setMealLogs([...mealLogs, newMealLog]);
  };

  const handleEditMealLog = (updatedMealLog: MealLog) => {
    setMealLogs(
      mealLogs.map((mealLog) =>
        mealLog.id === updatedMealLog.id ? updatedMealLog : mealLog
      )
    );
  };

  const handleDeleteMealLog = (mealLogId: string) => {
    setMealLogs(mealLogs.filter((mealLog) => mealLog.id !== mealLogId));
  };

  const handleAddWeightLog = (newWeightLog: WeightLog) => {
    setWeightLogs([...weightLogs, newWeightLog]);
  };

  const handleEditWeightLog = (updatedWeightLog: WeightLog) => {
    setWeightLogs(
      weightLogs.map((weightLog) =>
        weightLog.id === updatedWeightLog.id ? updatedWeightLog : weightLog
      )
    );
  };

  const handleDeleteWeightLog = (weightLogId: string) => {
    setWeightLogs(weightLogs.filter((weightLog) => weightLog.id !== weightLogId));
  };

  const currentWeekVideos = videos.filter(video => video.weekNumber === selectedWeek);
  const currentWeekMealLogs = mealLogs.filter(log => log.weekNumber === selectedWeek);
  const currentWeekWeightLogs = weightLogs.filter(log => log.weekNumber === selectedWeek);

  const getWeekProgress = (weekNum: number) => {
    const weekVideos = videos.filter(v => v.weekNumber === weekNum);
    const completedVideos = weekVideos.filter(v => v.completed).length;
    return weekVideos.length > 0 ? Math.round((completedVideos / weekVideos.length) * 100) : 0;
  };

  const canEditWeek = (weekNum: number) => {
    return weekNum <= userData.currentWeek;
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Your Program</h2>
            <p className="text-gray-500 mt-1">Week {userData.currentWeek} of 7</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Badge variant="secondary">
              <Calendar className="mr-1 h-3 w-3" />
              {userData.daysRemaining} days left
            </Badge>
            <Badge variant="outline">
              {userData.completedTasks}/{userData.totalTasks} tasks completed
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Program Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7].map((week) => (
                  <div
                    key={week}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedWeek === week
                        ? "border-[#8D97DE] bg-[#8D97DE]/5"
                        : canEditWeek(week)
                        ? "border-gray-200 hover:border-gray-300"
                        : "border-gray-100 bg-gray-50 cursor-not-allowed"
                    }`}
                    onClick={() => canEditWeek(week) && setSelectedWeek(week)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {week < userData.currentWeek ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : week === userData.currentWeek ? (
                          <Clock className="h-4 w-4 text-[#8D97DE]" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={`font-medium ${!canEditWeek(week) ? "text-gray-400" : ""}`}>
                          Week {week}
                        </span>
                      </div>
                      <span className={`text-sm ${!canEditWeek(week) ? "text-gray-400" : "text-gray-500"}`}>
                        {getWeekProgress(week)}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Week {selectedWeek} Tasks</span>
                  <Badge variant={selectedWeek === userData.currentWeek ? "default" : "secondary"}>
                    {selectedWeek === userData.currentWeek ? "Current" : selectedWeek < userData.currentWeek ? "Completed" : "Upcoming"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="videos" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="videos" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Videos ({currentWeekVideos.length})
                    </TabsTrigger>
                    <TabsTrigger value="meals" className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Meal Logs ({currentWeekMealLogs.length})
                    </TabsTrigger>
                    <TabsTrigger value="weight" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Weight Tracking ({currentWeekWeightLogs.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="videos" className="space-y-4">
                    {currentWeekVideos.length > 0 ? (
                      currentWeekVideos.map((video) => (
                        <VideoTaskRow
                          key={video.id}
                          video={video}
                          onComplete={handleVideoComplete}
                          onPlay={handleVideoPlay}
                          canEdit={canEditWeek(selectedWeek)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Play className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No videos scheduled for this week</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="meals" className="space-y-4">
                    {currentWeekMealLogs.map((mealLog) => (
                      <MealLogTaskRow
                        key={mealLog.id}
                        mealLog={mealLog}
                        weekNumber={selectedWeek}
                        onAddMealLog={handleAddMealLog}
                        onEditMealLog={handleEditMealLog}
                        onDeleteMealLog={handleDeleteMealLog}
                        canEdit={canEditWeek(selectedWeek)}
                      />
                    ))}
                    {canEditWeek(selectedWeek) && (
                      <Button
                        variant="outline"
                        onClick={() => handleAddMealLog({
                          id: `meal-${Date.now()}`,
                          date: new Date().toISOString().split('T')[0],
                          meal: "New Meal",
                          calories: 0,
                          weekNumber: selectedWeek
                        })}
                        className="w-full"
                      >
                        Add Meal Log
                      </Button>
                    )}
                  </TabsContent>

                  <TabsContent value="weight" className="space-y-4">
                    {currentWeekWeightLogs.map((weightLog) => (
                      <WeightTrackingTaskRow
                        key={weightLog.id}
                        weightLog={weightLog}
                        weekNumber={selectedWeek}
                        onAddWeightLog={handleAddWeightLog}
                        onEditWeightLog={handleEditWeightLog}
                        onDeleteWeightLog={handleDeleteWeightLog}
                        canEdit={canEditWeek(selectedWeek)}
                      />
                    ))}
                    {canEditWeek(selectedWeek) && (
                      <Button
                        variant="outline"
                        onClick={() => handleAddWeightLog({
                          id: `weight-${Date.now()}`,
                          date: new Date().toISOString().split('T')[0],
                          weight: 0,
                          weekNumber: selectedWeek
                        })}
                        className="w-full"
                      >
                        Add Weight Log
                      </Button>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Program;
