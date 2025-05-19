
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/components/customer/CustomerLayout";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Dummy data for CGM trend chart
  const glucoseData = [
    { time: "6AM", glucose: 90 },
    { time: "9AM", glucose: 140 },
    { time: "12PM", glucose: 110 },
    { time: "3PM", glucose: 125 },
    { time: "6PM", glucose: 145 },
    { time: "9PM", glucose: 95 },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Sarah!</h2>
          <p className="text-gray-500 mt-1">Let's check your progress for today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Program Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-semibold">Active</p>
                  <p className="text-sm text-gray-500">Week 3 of 7</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-[#F4D374] flex items-center justify-center text-lg font-bold">
                  43%
                </div>
              </div>
              <Link to="/customer/program">
                <Button className="w-full mt-4">View Program</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">CGM Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-semibold">Connected</p>
                  <p className="text-sm text-gray-500">Last reading: 10 min ago</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-[#BED1AB] flex items-center justify-center text-lg font-bold">
                  95
                </div>
              </div>
              <Link to="/customer/cgm">
                <Button className="w-full mt-4">View CGM Data</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/customer/coach">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  Log Today's Meal <Activity className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/customer/progress">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  Update Weight <BarChart2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/customer/videos">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  Watch Daily Video <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Glucose Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={glucoseData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[60, 180]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="glucose" 
                    stroke="#8D97DE" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-[#BED1AB]/20 to-[#A6B8B9]/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Today's Tip</h3>
              <p className="text-gray-700">Try to go for a 10-minute walk after each meal to help regulate your glucose levels naturally.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-[#8D97DE]/20 to-[#F4D374]/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Weekly Goal</h3>
              <p className="text-gray-700">Keep your post-meal glucose spikes under 140 mg/dL by balancing protein, fiber and healthy fats.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Dashboard;
