
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";

const TermsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Terms & Conditions</h1>
          <p className="text-gray-500">Manage legal terms and conditions for the platform</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[500px] font-mono"
              defaultValue={`# TERMS AND CONDITIONS

**Last Updated: April 15, 2025**

## 1. INTRODUCTION

Welcome to GeoDiet + Wonder Health ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services").

## 2. ACCEPTANCE OF TERMS

By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.

## 3. CHANGES TO TERMS

We may modify these Terms at any time. Your continued use of the Services following any changes indicates your acceptance of the revised Terms.

## 4. PRIVACY POLICY

Our Privacy Policy describes how we handle the information you provide to us. By using our Services, you consent to our collection and use of information as described in our Privacy Policy.

## 5. USER ACCOUNTS

To access certain features of our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

## 6. HEALTH DISCLAIMER

The information provided through our Services is for general informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider before making any changes to your diet, exercise routine, or other health-related behaviors.

## 7. SUBSCRIPTION SERVICES

7.1. Subscription Plans: We offer various subscription plans for access to our Services. The specific features and pricing of each plan are described on our website.

7.2. Billing: You agree to pay all fees associated with your subscription plan. Fees are non-refundable except as required by law or as specifically provided in these Terms.

7.3. Automatic Renewal: Your subscription will automatically renew at the end of each subscription period unless you cancel it before the renewal date.

## 8. INTELLECTUAL PROPERTY

All content, features, and functionality of our Services are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.

## 9. USER CONDUCT

You agree not to:
- Use the Services for any illegal purpose
- Interfere with the operation of the Services
- Access or attempt to access any other user's account
- Upload or transmit any viruses, malware, or other malicious code
- Use the Services to harass, abuse, or harm others

## 10. TERMINATION

We may terminate or suspend your access to the Services at any time without notice for any reason, including violation of these Terms.

## 11. DISCLAIMER OF WARRANTIES

THE SERVICES ARE PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

## 12. LIMITATION OF LIABILITY

IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.

## 13. GOVERNING LAW

These Terms shall be governed by and construed in accordance with the laws of the State of California.

## 14. CONTACT INFORMATION

If you have any questions about these Terms, please contact us at legal@geodiet.com.`}
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
                  <h3 className="font-medium">April 15, 2025</h3>
                  <p className="text-sm text-gray-500">Updated section on subscription services</p>
                </div>
                <Button variant="outline" size="sm">Restore</Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">March 22, 2025</h3>
                  <p className="text-sm text-gray-500">Added section on health disclaimers</p>
                </div>
                <Button variant="outline" size="sm">Restore</Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">January 10, 2025</h3>
                  <p className="text-sm text-gray-500">Initial terms and conditions publication</p>
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

export default TermsPage;
