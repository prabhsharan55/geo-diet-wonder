
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const AskCoach = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Ask a Coach</h2>
          <p className="text-gray-500 mt-1">Get personalized advice from nutrition experts</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <span>Jessica Miller, RD</span>
                  </div>
                  <Button variant="outline" size="sm">View Profile</Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 p-6 space-y-6 overflow-auto">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hi Sarah! How can I help you with your nutrition plan today?</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#8D97DE]/20 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">I'm having trouble with afternoon cravings around 3 PM. Any tips to control those?</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:32 AM</span>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/22.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">That's a common issue! Based on your CGM data, I can see that you may be experiencing a small glucose dip at that time. Try having a protein-rich snack with some healthy fats around 2:30 PM, like a handful of nuts or Greek yogurt with berries.</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:35 AM</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea placeholder="Type your question here..." className="min-h-[60px]" />
                    <div className="flex flex-col gap-2">
                      <Button size="icon" variant="outline">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Coach</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">Jessica Miller</h3>
                <p className="text-sm text-gray-500">Registered Dietitian, MS</p>
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Time</span>
                    <span className="text-green-600">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Specialties</span>
                    <span>Glucose Management, Weight Loss</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">How often should I log my meals?</p>
                  <p className="text-sm text-gray-500 mt-1">Try to log all meals daily for best results and insights.</p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium">What if I go over my carb limit?</p>
                  <p className="text-sm text-gray-500 mt-1">Don't stress! One meal won't derail your progress. Just get back on track with your next meal.</p>
                </div>
                
                <div>
                  <p className="font-medium">Can I have alcohol on this program?</p>
                  <p className="text-sm text-gray-500 mt-1">Alcohol can affect glucose levels. If you do drink, opt for dry wine or spirits without sugary mixers.</p>
                </div>
                
                <Button className="w-full flex items-center justify-center gap-2 mt-2">
                  <MessageCircle className="h-4 w-4" />
                  Ask New Question
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default AskCoach;
