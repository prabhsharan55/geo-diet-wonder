import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Clock, MessageCircle, PlusCircle, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const GeoDietCoach = () => {
  const [todayDate, setTodayDate] = useState("");
  const [todayDay, setTodayDay] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const formatDay = today.toLocaleDateString('en-US', { weekday: 'long' });
    setTodayDate(formatDate);
    setTodayDay(formatDay);
  }, []);

  // Fetch personalized meal plans for today
  const { data: mealPlans, isLoading } = useQuery({
    queryKey: ['meal-plans', todayDate],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('date', today)
        .order('meal_type');
      
      if (error) {
        console.error('Error fetching meal plans:', error);
        return [];
      }
      
      return data || [];
    },
  });

  // Group meal plans by meal type
  const groupedMealPlans = mealPlans?.reduce((acc, plan) => {
    if (!acc[plan.meal_type]) {
      acc[plan.meal_type] = [];
    }
    acc[plan.meal_type].push(plan);
    return acc;
  }, {} as Record<string, any[]>) || {};

  // Default meal suggestions when no personalized plans are available
  const defaultMeals = [
    {
      time: "Breakfast",
      suggestions: [
        {
          name: "Greek yogurt with berries",
          description: "1 cup Greek yogurt with 1/2 cup mixed berries and 1 tbsp honey",
          calories: 240,
          feedback: "Great source of protein and probiotics with minimal glucose impact."
        },
        {
          name: "Veggie omelet",
          description: "2 eggs with spinach, tomatoes, and 1/4 avocado",
          calories: 280,
          feedback: "Excellent balance of protein and healthy fats."
        }
      ]
    },
    {
      time: "Lunch",
      suggestions: [
        {
          name: "Mediterranean bowl",
          description: "Grilled chicken, quinoa, cucumber, tomatoes, feta, olive oil",
          calories: 420,
          feedback: "Balanced meal with protein, complex carbs, and healthy fats."
        },
        {
          name: "Lentil soup with salad",
          description: "1 cup lentil soup with mixed green salad and olive oil dressing",
          calories: 350,
          feedback: "Plant-based protein with fiber for steady glucose levels."
        }
      ]
    },
    {
      time: "Dinner",
      suggestions: [
        {
          name: "Baked salmon",
          description: "4oz baked salmon with roasted vegetables and 1/2 cup brown rice",
          calories: 440,
          feedback: "Omega-3 rich protein source with fiber-rich sides."
        },
        {
          name: "Tofu stir-fry",
          description: "Tofu with mixed vegetables and 1/3 cup brown rice",
          calories: 380,
          feedback: "Plant-based protein with fiber-rich vegetables."
        }
      ]
    },
    {
      time: "Snacks",
      suggestions: [
        {
          name: "Apple with almond butter",
          description: "1 medium apple with 1 tbsp almond butter",
          calories: 170,
          feedback: "Fiber + protein combination helps maintain steady glucose."
        },
        {
          name: "Veggie sticks with hummus",
          description: "Carrot and cucumber sticks with 2 tbsp hummus",
          calories: 120,
          feedback: "Low-impact snack with plant protein from chickpeas."
        }
      ]
    }
  ];

  // Convert database meal plans to the expected format
  const getMealsForDisplay = () => {
    if (Object.keys(groupedMealPlans).length === 0) {
      return defaultMeals;
    }

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    return mealTypes.map(mealType => ({
      time: mealType,
      suggestions: groupedMealPlans[mealType]?.map(plan => ({
        name: plan.name,
        description: plan.description,
        calories: plan.calories || 0,
        feedback: plan.feedback || "Personalized recommendation from your clinic."
      })) || defaultMeals.find(m => m.time === mealType)?.suggestions || []
    }));
  };

  const meals = getMealsForDisplay();

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">GeoDiet Coach</h2>
          <p className="text-gray-500 mt-1">Your personalized nutrition guidance</p>
        </div>
        
        <Tabs defaultValue="meal-plan" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="meal-plan">Today's Meal Plan</TabsTrigger>
            <TabsTrigger value="log-meal">Log My Meals</TabsTrigger>
            <TabsTrigger value="chat">Chat with Coach</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meal-plan" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Personalized Meal Suggestions</span>
                  <div className="text-right">
                    <div className="text-sm font-medium bg-[#F4D374] text-[#160041] py-1 px-3 rounded-full">
                      {todayDate}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{todayDay}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading your personalized meal plan...</div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.keys(groupedMealPlans).length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                          <Utensils className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">
                            Personalized meal plan from your clinic
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {meals.map((meal, idx) => (
                      <div key={idx} className={idx < meals.length - 1 ? "border-b pb-6" : ""}>
                        <div className="flex items-center mb-4">
                          <Utensils className="h-5 w-5 mr-2 text-[#8D97DE]" />
                          <h3 className="text-lg font-medium">{meal.time}</h3>
                        </div>
                        
                        {meal.suggestions.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {meal.suggestions.map((suggestion, i) => (
                              <Card key={i} className="overflow-hidden">
                                <div className="h-32 bg-gradient-to-r from-[#BED1AB]/30 to-[#A6B8B9]/30 flex items-center justify-center">
                                  <span className="text-lg font-medium">{suggestion.name}</span>
                                </div>
                                <CardContent className="p-4">
                                  <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{suggestion.calories} calories</span>
                                    <span className="text-green-600">Low Glycemic</span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-2 italic">{suggestion.feedback}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Utensils className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No personalized suggestions for {meal.time} today</p>
                            <p className="text-xs">Your clinic will add recommendations soon</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-r from-[#8D97DE]/20 to-[#F4D374]/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Today's Nutrition Goal</h3>
                  <p>Focus on including protein with each meal and snack to help maintain steady glucose levels throughout the day.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Food Swaps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">White rice</p>
                      <p className="text-sm text-red-500">High glycemic impact</p>
                    </div>
                    <span className="text-lg">→</span>
                    <div>
                      <p className="font-medium">Cauliflower rice</p>
                      <p className="text-sm text-green-600">Low glycemic impact</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Orange juice</p>
                      <p className="text-sm text-red-500">High glycemic impact</p>
                    </div>
                    <span className="text-lg">→</span>
                    <div>
                      <p className="font-medium">Whole orange</p>
                      <p className="text-sm text-green-600">Low glycemic impact</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="log-meal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Today's Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealTime, idx) => (
                    <div key={idx} className={idx < 3 ? "border-b pb-6" : ""}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-[#8D97DE]" />
                          <h3 className="text-lg font-medium">{mealTime}</h3>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <PlusCircle className="h-4 w-4" />
                          <span>Add {mealTime}</span>
                        </Button>
                      </div>
                      
                      {idx === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <div className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center">
                              <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Greek yogurt bowl</p>
                                  <p className="text-sm text-gray-500">8:15 AM - 310 calories</p>
                                </div>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </div>
                              <p className="text-sm mt-2">Greek yogurt with blueberries, banana, and granola</p>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2 text-sm">
                            <span className="bg-[#8D97DE]/20 text-[#8D97DE] px-2 py-1 rounded">Protein</span>
                            <span className="bg-[#BED1AB]/20 text-[#BED1AB] px-2 py-1 rounded">Fruits</span>
                            <span className="bg-[#F4D374]/20 text-[#F4D374] px-2 py-1 rounded">Grains</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                          <Camera className="h-10 w-10 text-gray-300 mb-2" />
                          <p className="text-gray-500">No {mealTime.toLowerCase()} logged yet</p>
                          <p className="text-sm text-gray-400 mb-4">Take a photo or enter details manually</p>
                          <div className="flex gap-2">
                            <Button>Upload Photo</Button>
                            <Button variant="outline">Manual Entry</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat with Your Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 rounded-full bg-[#8D97DE]/20 flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-[#8D97DE]" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Connect with your nutritionist</h3>
                  <p className="text-gray-500 mb-6">Ask questions about your meal plan, get feedback on your progress, or discuss your glucose data.</p>
                  <Button>Start Conversation</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default GeoDietCoach;
