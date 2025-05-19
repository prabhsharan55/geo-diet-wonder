
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const Progress = () => {
  // Dummy data for weight chart
  const weightData = [
    { week: "Week 1", weight: 172 },
    { week: "Week 2", weight: 170 },
    { week: "Week 3", weight: 168 },
    { week: "Week 4", weight: 167 },
    { week: "Week 5", weight: 165 },
    { week: "Week 6", weight: 164 },
    { week: "Week 7", weight: 162 },
  ];

  // Dummy data for glucose chart
  const glucoseData = [
    { week: "Week 1", avg: 118 },
    { week: "Week 2", avg: 115 },
    { week: "Week 3", avg: 112 },
    { week: "Week 4", avg: 109 },
    { week: "Week 5", avg: 107 },
    { week: "Week 6", avg: 105 },
    { week: "Week 7", avg: 103 },
  ];

  // Dummy data for energy levels
  const energyData = [
    { week: "Week 1", level: 5 },
    { week: "Week 2", level: 6 },
    { week: "Week 3", level: 6 },
    { week: "Week 4", level: 7 },
    { week: "Week 5", level: 7 },
    { week: "Week 6", level: 8 },
    { week: "Week 7", level: 8 },
  ];

  // Dummy data for water intake
  const waterData = [
    { day: "Mon", glasses: 6 },
    { day: "Tue", glasses: 8 },
    { day: "Wed", glasses: 7 },
    { day: "Thu", glasses: 5 },
    { day: "Fri", glasses: 9 },
    { day: "Sat", glasses: 6 },
    { day: "Sun", glasses: 7 },
  ];

  // Dummy data for diet adherence
  const dietData = [
    { name: "Followed Plan", value: 75 },
    { name: "Off Plan", value: 25 },
  ];

  const COLORS = ["#8D97DE", "#F4D374"];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Progress & Reports</h2>
            <p className="text-gray-500 mt-1">Track your health journey metrics</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#8D97DE]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mb-1">Initial Weight</p>
              <p className="text-3xl font-bold">172 lbs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#BED1AB]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mb-1">Current Weight</p>
              <p className="text-3xl font-bold">162 lbs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#F4D374]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mb-1">Total Loss</p>
              <p className="text-3xl font-bold text-green-600">-10 lbs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#A6B8B9]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mb-1">Avg. Glucose</p>
              <p className="text-3xl font-bold">103 mg/dL</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="glucose">Glucose</TabsTrigger>
            <TabsTrigger value="energy">Energy & Sleep</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weightData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Area type="monotone" dataKey="weight" stroke="#8D97DE" fill="#8D97DE" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Body Measurements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Waist</span>
                      <div>
                        <span className="font-medium">34"</span>
                        <span className="text-green-600 text-sm ml-2">-2"</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hips</span>
                      <div>
                        <span className="font-medium">42"</span>
                        <span className="text-green-600 text-sm ml-2">-1"</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Chest</span>
                      <div>
                        <span className="font-medium">38"</span>
                        <span className="text-green-600 text-sm ml-2">-1.5"</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>InBody Data</span>
                    <Button variant="outline" size="sm" className="flex gap-1">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Body Fat %</span>
                      <div>
                        <span className="font-medium">24.5%</span>
                        <span className="text-green-600 text-sm ml-2">-2.8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Muscle Mass</span>
                      <div>
                        <span className="font-medium">120 lbs</span>
                        <span className="text-green-600 text-sm ml-2">+2 lbs</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Metabolic Rate</span>
                      <div>
                        <span className="font-medium">1620 cal</span>
                        <span className="text-green-600 text-sm ml-2">+45 cal</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="glucose" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Glucose Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={glucoseData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis domain={[90, 120]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="avg" stroke="#8D97DE" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Starting Avg. Glucose</p>
                      <p className="text-xl font-bold">118 mg/dL</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Current Avg. Glucose</p>
                      <p className="text-xl font-bold">103 mg/dL</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500">Improvement</p>
                      <p className="text-xl font-bold text-green-600">-15 mg/dL</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="energy" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Energy Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={energyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="level" stroke="#F4D374" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">Energy scale: 1-10 (subjective rating)</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Sleep Duration</span>
                    <span className="font-medium">7.2 hours</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="bg-[#8D97DE] h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-600">Deep Sleep</span>
                    <span className="font-medium">1.8 hours</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="bg-[#8D97DE] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-600">REM Sleep</span>
                    <span className="font-medium">1.4 hours</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="bg-[#8D97DE] h-2 rounded-full" style={{ width: '47%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Diet Plan Adherence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dietData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {dietData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Water Intake</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={waterData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="glasses" fill="#BED1AB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">Target: 8 glasses per day</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default Progress;
