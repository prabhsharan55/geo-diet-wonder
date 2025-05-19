
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";

const PolicyPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Refund Policy</h1>
          <p className="text-gray-500">Manage refund and cancellation policies</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Refund Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[500px] font-mono"
              defaultValue={`# REFUND POLICY

**Last Updated: April 10, 2025**

## OVERVIEW

At GeoDiet + Wonder Health, we want you to be completely satisfied with your purchase. This Refund Policy outlines when and how you can request a refund for our services.

## ELIGIBILITY FOR REFUNDS

### 7-Day Satisfaction Guarantee

We offer a 7-day satisfaction guarantee for all new subscriptions. If you are not satisfied with your subscription for any reason, you may request a full refund within 7 days of your purchase.

### Continuous Glucose Monitoring (CGM) Packages

For packages that include CGM devices:

- **Before Device Dispatch**: Full refund available
- **After Device Dispatch but Before Activation**: Partial refund (minus device and shipping costs)
- **After Device Activation**: No refund available

### Digital-Only Packages

- **Within 7 Days**: Full refund available
- **After 7 Days**: No refund available unless required by law

## HOW TO REQUEST A REFUND

To request a refund:

1. Log in to your account
2. Go to "Billing & Subscription"
3. Select "Request Refund"
4. Follow the prompts to complete your request

Alternatively, you can contact our Customer Support team at support@geodiet.com.

## PROCESSING TIME

Approved refunds will be processed within 5-10 business days. The time it takes for the refunded amount to appear in your account depends on your payment method and financial institution.

## EXCEPTIONS

No refunds will be issued in cases of:

- Account termination due to violation of our Terms of Service
- Fraudulent activity
- Requests made after the eligible refund period

## CANCELLATION POLICY

### Subscription Cancellation

You may cancel your subscription at any time:

1. Log in to your account
2. Go to "Billing & Subscription"
3. Select "Cancel Subscription"

Cancelling your subscription will:

- Stop automatic renewals
- Allow you to continue using the service until the end of the current billing period
- Not provide a refund for the current billing period

### Subscription Pausing

We offer the ability to pause your subscription for up to 30 days once per subscription year without losing your current pricing or benefits.

## CHANGES TO THIS POLICY

We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website.

## CONTACT US

If you have any questions about this Refund Policy, please contact us:

- Email: support@geodiet.com
- Phone: (800) 555-1234
- Online: www.geodiet.com/contact`}
            />
            
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Publication History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">April 10, 2025</h3>
                  <p className="text-sm text-gray-500">Updated refund policy for CGM packages</p>
                </div>
                <Button variant="outline" size="sm">Restore</Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">February 15, 2025</h3>
                  <p className="text-sm text-gray-500">Added subscription pausing option</p>
                </div>
                <Button variant="outline" size="sm">Restore</Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">December 5, 2024</h3>
                  <p className="text-sm text-gray-500">Initial refund policy publication</p>
                </div>
                <Button variant="outline" size="sm">Restore</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PolicyPage;
