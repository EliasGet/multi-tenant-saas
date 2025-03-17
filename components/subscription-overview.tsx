import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function SubscriptionOverview() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Pro Plan</h3>
          <p className="text-sm text-gray-500">$29.99/month</p>
        </div>
        <Button variant="outline" size="sm">
          Upgrade
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Users (8/10)</span>
          <span>80%</span>
        </div>
        <Progress value={80} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Projects (15/20)</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Storage (7.5/10 GB)</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-gray-500">
          Your subscription renews on <span className="font-medium">April 15, 2023</span>
        </p>
      </div>
    </div>
  )
}

