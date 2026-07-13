import { Activity, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Metadata } from "next";

import MetaConfig from "@/meta.json";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";

export const metadata: Metadata = {
  title: `Dashboard - ${MetaConfig.title}`,
  description: MetaConfig.description,
};

const PageDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      icon: Users,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: DollarSign,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Orders",
      value: "1,234",
      icon: ShoppingBag,
      change: "-3%",
      changeType: "negative",
    },
    {
      title: "Active Users",
      value: "5,678",
      icon: Activity,
      change: "+5%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add more dashboard content here */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm">User {item} performed an action</p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Add New User
              </Button>
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
              <Button className="w-full" variant="outline">
                Manage Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageDashboard;
