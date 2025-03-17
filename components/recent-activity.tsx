import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "created a new project",
      target: "Marketing Campaign",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "invited a new user",
      target: "Alex Johnson",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Mike Brown",
        email: "mike@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "updated the settings",
      target: "Billing Information",
      time: "1 day ago",
    },
    {
      id: 4,
      user: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "completed a task",
      target: "Design Review",
      time: "1 day ago",
    },
    {
      id: 5,
      user: {
        name: "David Lee",
        email: "david@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "commented on",
      target: "Project Roadmap",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.target}</span>
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

