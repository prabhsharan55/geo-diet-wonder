
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lock, PlayCircle, Utensils, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Program = () => {
  // Current program details
  const currentWeek = 3;
  const totalWeeks = 7;

  // Create an array of week data
  const weeks = [...Array(totalWeeks)].map((_, index) => {
    const weekNum = index + 1;
    const status = weekNum < currentWeek ? "completed" : weekNum === currentWeek ? "current" : "locked";
    
    return {
      number: weekNum,
      status,
      completion: weekNum < currentWeek ? 100 : weekNum === currentWeek ? 65 : 0,
      activities: [
        { 
          title: "Watch Introduction Video", 
          type: "video", 
          icon: PlayCircle, 
          completed: status === "completed" || (status === "current" && Math.random() > 0.5)
        },
        { 
          title: "Log Daily Meals", 
          type: "meal", 
          icon: Utensils, 
          completed: status === "completed" || (status === "current" && Math.random() > 0.5)
        },
        { 
          title: "Track Weight", 
          type: "weight", 
          icon: Weight, 
          completed: status === "completed" || (status === "current" && Math.random() > 0.5)
        }
      ]
    };
  });

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Program</h2>
          <p className="text-gray-500 mt-1">Your 7-week GeoDiet program journey</p>
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
            <div className="mb-2 flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{Math.round((currentWeek - 1 + 0.65) / totalWeeks * 100)}%</span>
            </div>
            <Progress value={Math.round((currentWeek - 1 + 0.65) / totalWeeks * 100)} className="h-2" />
          </CardContent>
        </Card>
        
        <Tabs defaultValue={`week-${currentWeek}`} className="w-full">
          <TabsList className="w-full flex overflow-x-auto">
            {weeks.map((week) => (
              <TabsTrigger 
                key={`week-${week.number}`} 
                value={`week-${week.number}`}
                disabled={week.status === "locked"}
                className="flex-1"
              >
                Week {week.number}
                {week.status === "completed" && <Check className="ml-2 h-4 w-4 text-green-500" />}
                {week.status === "locked" && <Lock className="ml-2 h-4 w-4" />}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {weeks.map((week) => (
            <TabsContent key={`content-${week.number}`} value={`week-${week.number}`} className="mt-6 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Week {week.number} Overview</span>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                      {week.completion}% Complete
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {week.status === "locked" 
                      ? "This content will be unlocked when you reach Week " + week.number 
                      : week.status === "completed"
                        ? "You've completed this week! Review the content any time."
                        : "Focus on consistency this week and tracking your meals accurately."}
                  </p>
                  
                  <Progress value={week.completion} className="h-2 mb-6" />
                  
                  <div className="space-y-4">
                    {week.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                            activity.completed ? "bg-green-100" : "bg-gray-100"
                          )}>
                            <activity.icon className={cn(
                              "h-5 w-5",
                              activity.completed ? "text-green-600" : "text-gray-500"
                            )} />
                          </div>
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-gray-500">{activity.type === "video" ? "5 minutes" : activity.type === "meal" ? "Daily task" : "Weekly task"}</div>
                          </div>
                        </div>
                        <Button 
                          variant={activity.completed ? "outline" : "default"}
                          disabled={week.status === "locked"}
                        >
                          {activity.completed ? "Complete" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Understand your glucose responses to different foods and begin identifying your personal food triggers.</p>
                    <Button variant="outline" disabled={week.status === "locked"}>Learn More</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recommended Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="h-5 w-5 text-[#8D97DE]" />
                        <span className="flex-1">Understanding Your CGM Data</span>
                        <Button size="sm" variant="outline" disabled={week.status === "locked"}>Watch</Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <PlayCircle className="h-5 w-5 text-[#8D97DE]" />
                        <span className="flex-1">Food & Glucose Response</span>
                        <Button size="sm" variant="outline" disabled={week.status === "locked"}>Watch</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default Program;
