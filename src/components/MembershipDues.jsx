import { Button } from "@/components/ui/button";

const MembershipDues = () => {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="font-heading font-semibold mb-4">Membership Dues</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Current</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Next Due Date:</span>
          <span>October 1, 2024</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Amount:</span>
          <span>$50.00</span>
        </div>
        <Button variant='lg' className="w-full mt-4 !bg-primary !text-primary-foreground">Pay Now</Button>
      </div>
    </div>
  );
};

export default MembershipDues;