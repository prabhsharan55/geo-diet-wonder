
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserData } from "@/context/UserDataContext";
import { useToast } from "@/hooks/use-toast";

const rescheduleSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your appointment.",
  }),
  time: z.string().min(1, "Please select a time for your appointment."),
  reason: z.string().min(1, "Please provide a reason for rescheduling."),
});

type RescheduleFormData = z.infer<typeof rescheduleSchema>;

interface RescheduleAppointmentDialogProps {
  appointmentId: string;
  appointmentTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const RescheduleAppointmentDialog = ({
  appointmentId,
  appointmentTitle,
  isOpen,
  onClose,
}: RescheduleAppointmentDialogProps) => {
  const { requestReschedule } = useUserData();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RescheduleFormData>({
    resolver: zodResolver(rescheduleSchema),
  });

  const onSubmit = async (data: RescheduleFormData) => {
    setIsSubmitting(true);
    
    try {
      const formattedDate = format(data.date, "MMM dd, yyyy");
      requestReschedule(appointmentId, formattedDate, data.time, data.reason);
      
      toast({
        title: "Reschedule Request Submitted",
        description: "Your request to reschedule has been submitted and is waiting for clinic approval. Once approved, you will see the updated appointment here.",
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit reschedule request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Request to reschedule your {appointmentTitle.toLowerCase()}. Please provide your preferred date, time, and reason.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Select time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Rescheduling</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide a reason for rescheduling your appointment..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleAppointmentDialog;
