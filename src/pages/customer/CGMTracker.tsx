
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CalendarDays, Clock, Coffee, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CGMTracker = () => {
  // Dummy data for daily glucose chart
  const dayData = [
    { time: "12AM", glucose: 95 },
    { time: "2AM", glucose: 90 },
    { time: "4AM", glucose: 88 },
    { time: "6AM", glucose: 85 },
    { time: "8AM", glucose: 130, meal: "Breakfast" },
    { time: "10AM", glucose: 105 },
    { time: "12PM", glucose: 120, meal: "Lunch" },
    { time: "2PM", glucose: 140 },
    { time: "4PM", glucose: 95 },
    { time: "6PM", glucose: 110, meal: "Dinner" },
    { time: "8PM", glucose: 135 },
    { time: "10PM", glucose: 100 },
  ];
  
  // Dummy data for weekly glucose chart
  const weekData = [
    { day: "Mon", avg: 105, min: 85, max: 145 },
    { day: "Tue", avg: 110, min: 82, max: 152 },
    { day: "Wed", avg: 103, min: 80, max: 138 },
    { day: "Thu", avg: 112, min: 88, max: 156 },
    { day: "Fri", avg: 108, min: 84, max: 140 },
    { day: "Sat", avg: 115, min: 90, max: 160 },
    { day: "Sun", avg: 106, min: 84, max: 138 },
  ];

  const stats = [
    { label: "Average Glucose", value: "108", unit: "mg/dL" },
    { label: "Highest Reading", value: "156", unit: "mg/dL" },
    { label: "Lowest Reading", value: "80", unit: "mg/dL" },
    { label: "Time in Range", value: "85", unit: "%" },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">CGM Tracker</h2>
          <p className="text-gray-500 mt-1">Monitor your continuous glucose measurements</p>
        </div>
        
        <Alert variant="default" className="bg-[#F4D374]/20 border-[#F4D374]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Glucose Alert</AlertTitle>
          <AlertDescription>
            You had a glucose spike of 156 mg/dL yesterday at 2:30 PM. This might be related to your afternoon snack.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}<span className="text-sm font-normal ml-1">{stat.unit}</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="day" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="day" className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center justify-between">
                  <span>Today's Glucose Levels</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>May 19, 2025</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dayData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" />
                      <YAxis domain={[60, 180]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border rounded shadow-lg">
                                <p className="font-medium">{payload[0].payload.time}</p>
                                <p className="text-[#8D97DE]">
                                  {payload[0].value} mg/dL
                                </p>
                                {payload[0].payload.meal && (
                                  <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <Coffee className="h-3 w-3 mr-1" />
                                    {payload[0].payload.meal}
                                  </p>
                                )}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={140} stroke="red" strokeDasharray="3 3" />
                      <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" />
                      <Line 
                        type="monotone" 
                        dataKey="glucose" 
                        stroke="#8D97DE" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex justify-center gap-8">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-red-500 mr-2"></div>
                    <span>High threshold (140 mg/dL)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-red-500 mr-2"></div>
                    <span>Low threshold (70 mg/dL)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Meal Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex justify-between">
                      <p className="font-medium">Breakfast</p>
                      <p className="text-gray-500">8:00 AM</p>
                    </div>
                    <p className="text-sm text-gray-500">Oatmeal with berries & nuts</p>
                    <p className="text-sm mt-1 text-[#8D97DE]">+45 mg/dL spike (within normal range)</p>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex justify-between">
                      <p className="font-medium">Lunch</p>
                      <p className="text-gray-500">12:00 PM</p>
                    </div>
                    <p className="text-sm text-gray-500">Chicken salad with quinoa</p>
                    <p className="text-sm mt-1 text-green-600">+20 mg/dL (excellent response)</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <p className="font-medium">Dinner</p>
                      <p className="text-gray-500">6:00 PM</p>
                    </div>
                    <p className="text-sm text-gray-500">Salmon with vegetables</p>
                    <p className="text-sm mt-1 text-[#8D97DE]">+25 mg/dL spike (within normal range)</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-700">Good job!</p>
                      <p className="text-sm text-green-600">Your glucose has been stable for the past 24 hours.</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-700">Recommendation</p>
                      <p className="text-sm text-blue-600">Try taking a 10-minute walk after meals to further reduce glucose spikes.</p>
                    </div>
                    
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="font-medium text-amber-700">Pattern Detected</p>
                      <p className="text-sm text-amber-600">Your highest glucose readings tend to be after lunch. Consider adjusting your carb intake at this meal.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Glucose Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weekData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={[60, 180]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="avg" stroke="#8D97DE" strokeWidth={2} />
                      <Line type="monotone" dataKey="max" stroke="#F4D374" strokeWidth={1} strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="min" stroke="#BED1AB" strokeWidth={1} strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-[#8D97DE] mr-1"></div>
                    <span>Average</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-[#F4D374] mr-1"></div>
                    <span>Maximum</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-[#BED1AB] mr-1"></div>
                    <span>Minimum</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month" className="mt-6">
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Monthly View Coming Soon</h3>
                <p className="text-gray-500">We're working on advanced analytics for your monthly glucose trends.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CGMTracker;
