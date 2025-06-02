
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusCircle, Edit, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useToast } from "@/hooks/use-toast";

const MealPlanning = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [mealData, setMealData] = useState({
    meal_type: "",
    name: "",
    description: "",
    calories: "",
    feedback: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch customers with a simplified query
  const { data: customers, isLoading: customersLoading, error: customersError } = useQuery({
    queryKey: ['clinic-customers'],
    queryFn: async () => {
      console.log('Fetching customers for meal planning...');
      
      // First get customers
      const { data: customersData, error: customersErr } = await supabase
        .from('customers')
        .select('id, email, user_id, access_status')
        .eq('access_status', 'active');
      
      console.log('Customers query result:', { customersData, customersErr });
      
      if (customersErr) throw customersErr;
      
      if (!customersData || customersData.length === 0) {
        console.log('No customers found');
        return [];
      }

      // Then get user details for each customer
      const customersWithUsers = await Promise.all(
        customersData.map(async (customer) => {
          const { data: userData, error: userErr } = await supabase
            .rpc('get_user_details', { user_id: customer.user_id });
          
          console.log(`User data for ${customer.email}:`, { userData, userErr });
          
          return {
            ...customer,
            users: userData && userData.length > 0 ? userData[0] : null
          };
        })
      );
      
      console.log('Final customers with users:', customersWithUsers);
      return customersWithUsers;
    },
  });

  // Get selected customer details
  const selectedCustomerData = customers?.find(customer => customer.id === selectedCustomer);

  // Fetch meal plans for selected customer and date
  const { data: mealPlans } = useQuery({
    queryKey: ['meal-plans', selectedCustomer, selectedDate],
    queryFn: async () => {
      if (!selectedCustomer || !selectedDate) return [];
      
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('customer_id', selectedCustomer)
        .eq('date', dateString)
        .order('meal_type');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedCustomer && !!selectedDate,
  });

  // Create meal plan mutation
  const createMealPlan = useMutation({
    mutationFn: async (planData: any) => {
      const { data, error } = await supabase
        .from('meal_plans')
        .insert([planData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Meal plan created successfully!" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating meal plan", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  // Update meal plan mutation
  const updateMealPlan = useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data, error } = await supabase
        .from('meal_plans')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      setIsDialogOpen(false);
      setEditingPlan(null);
      resetForm();
      toast({ title: "Meal plan updated successfully!" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating meal plan", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  // Delete meal plan mutation
  const deleteMealPlan = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      toast({ title: "Meal plan deleted successfully!" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting meal plan", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const resetForm = () => {
    setMealData({
      meal_type: "",
      name: "",
      description: "",
      calories: "",
      feedback: ""
    });
  };

  const handleSubmit = () => {
    if (!selectedCustomer || !selectedDate) {
      toast({ 
        title: "Please select a customer and date", 
        variant: "destructive" 
      });
      return;
    }

    const planData = {
      customer_id: selectedCustomer,
      date: format(selectedDate, 'yyyy-MM-dd'),
      meal_type: mealData.meal_type,
      name: mealData.name,
      description: mealData.description,
      calories: mealData.calories ? parseInt(mealData.calories) : null,
      feedback: mealData.feedback
    };

    if (editingPlan) {
      updateMealPlan.mutate({ id: editingPlan.id, ...planData });
    } else {
      createMealPlan.mutate(planData);
    }
  };

  const handleEdit = (plan: any) => {
    setEditingPlan(plan);
    setMealData({
      meal_type: plan.meal_type,
      name: plan.name,
      description: plan.description,
      calories: plan.calories?.toString() || "",
      feedback: plan.feedback || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this meal plan?")) {
      deleteMealPlan.mutate(id);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Customer Meal Planning</h2>
          <p className="text-gray-500 mt-1">Create personalized meal plans for your customers</p>
        </div>

        {/* Debug section */}
        {process.env.NODE_ENV === 'development' && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Debug Info:</h3>
              <p className="text-sm">Customers loading: {customersLoading ? 'Yes' : 'No'}</p>
              <p className="text-sm">Customers error: {customersError?.message || 'None'}</p>
              <p className="text-sm">Total customers found: {customers?.length || 0}</p>
              <div className="mt-2 max-h-32 overflow-y-auto">
                <pre className="text-xs bg-gray-100 p-2 rounded">
                  {JSON.stringify(customers, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer and Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Customer & Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                {customersLoading ? (
                  <div className="p-2 text-sm text-gray-500">Loading customers...</div>
                ) : customersError ? (
                  <div className="p-2 text-sm text-red-500">Error loading customers: {customersError.message}</div>
                ) : (
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 max-h-60 overflow-y-auto">
                      {customers?.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>
                              {customer.users?.full_name || 'No Name'} ({customer.email})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {customers?.length === 0 && !customersLoading && (
                  <div className="p-2 text-sm text-gray-500">No active customers found</div>
                )}
              </div>

              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full" 
                  disabled={!selectedCustomer || !selectedDate}
                  onClick={() => {
                    setEditingPlan(null);
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Meal Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingPlan ? "Edit Meal Plan" : "Add Meal Plan"}
                  </DialogTitle>
                  {selectedCustomerData && (
                    <div className="bg-blue-50 p-3 rounded-lg mt-2">
                      <h4 className="font-medium text-blue-900">Customer Details</h4>
                      <div className="text-sm text-blue-700 mt-1">
                        <p><strong>Name:</strong> {selectedCustomerData.users?.full_name || 'No Name'}</p>
                        <p><strong>Email:</strong> {selectedCustomerData.email}</p>
                        {selectedDate && (
                          <p><strong>Date:</strong> {format(selectedDate, "PPP")}</p>
                        )}
                      </div>
                    </div>
                  )}
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meal_type">Meal Type</Label>
                    <Select value={mealData.meal_type} onValueChange={(value) => setMealData(prev => ({ ...prev, meal_type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {mealTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">Meal Name</Label>
                    <Input
                      id="name"
                      value={mealData.name}
                      onChange={(e) => setMealData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Greek yogurt with berries"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={mealData.description}
                      onChange={(e) => setMealData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed meal description..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="calories">Calories (optional)</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={mealData.calories}
                      onChange={(e) => setMealData(prev => ({ ...prev, calories: e.target.value }))}
                      placeholder="e.g., 240"
                    />
                  </div>

                  <div>
                    <Label htmlFor="feedback">Nutritionist Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={mealData.feedback}
                      onChange={(e) => setMealData(prev => ({ ...prev, feedback: e.target.value }))}
                      placeholder="Why this meal is recommended..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleSubmit} className="w-full">
                    {editingPlan ? "Update Meal Plan" : "Create Meal Plan"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Existing Meal Plans */}
        {selectedCustomer && selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>
                Meal Plans for {selectedCustomerData?.users?.full_name || 'Customer'} - {format(selectedDate, "PPP")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mealPlans && mealPlans.length > 0 ? (
                <div className="space-y-4">
                  {mealPlans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {plan.meal_type}
                            </span>
                            {plan.calories && (
                              <span className="text-sm text-gray-500">
                                {plan.calories} calories
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium">{plan.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                          {plan.feedback && (
                            <p className="text-xs text-gray-500 mt-2 italic">{plan.feedback}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(plan.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PlusCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No meal plans created for this date</p>
                  <p className="text-sm">Click "Add Meal Plan" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PartnerLayout>
  );
};

export default MealPlanning;
