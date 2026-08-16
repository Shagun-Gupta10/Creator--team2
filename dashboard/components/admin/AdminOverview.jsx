import React from "react";

import {
  Users,
  UserCheck,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertTriangle,
  Server,
  Database,
  Clock,
  CheckCircle2,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CustomTooltip from "../Marketting/CustomTooltip";
const userGrowthData = [
  { month: "Jan", users: 420 },
  { month: "Feb", users: 510 },
  { month: "Mar", users: 620 },
  { month: "Apr", users: 740 },
  { month: "May", users: 880 },
  { month: "Jun", users: 1024 },
];


const roleData = [
  { name: "Creators", value: 620 },
  { name: "Agencies", value: 145 },
  { name: "Marketing", value: 92 },
  { name: "Administrators", value: 12 },
];


const roleColors = [
  "#2563EB",
  "#7C3AED",
  "#059669",
  "#F97316",
];


const recentActivities = [
  {
    title: "New creator account approved",
    user: "Ananya",
    time: "5 minutes ago",
    status: "Success",
  },
  {
    title: "Agency account verification",
    user: "Growth Media",
    time: "18 minutes ago",
    status: "Pending",
  },
  {
    title: "Marketing report generated",
    user: "Marketing Team",
    time: "42 minutes ago",
    status: "Success",
  },
  {
    title: "Unusual login attempt detected",
    user: "Unknown device",
    time: "1 hour ago",
    status: "Alert",
  },
];


function AdminOverview() {

  const stats = [
    {
      title: "Total Users",
      value: "1,024",
      change: "+12.8%",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Active Users",
      value: "842",
      change: "82.2% active",
      icon: UserCheck,
      color: "bg-green-100 text-green-700",
    },

    {
      title: "Pending Approvals",
      value: "18",
      change: "Needs review",
      icon: Clock,
      color: "bg-orange-100 text-orange-700",
    },

    {
      title: "System Health",
      value: "99.9%",
      change: "All systems operational",
      icon: ShieldCheck,
      color: "bg-purple-100 text-purple-700",
    },
  ];


  return (

    <div className="space-y-7">


      {/* HEADER */}

      <div>

        <p className="text-blue-600 font-semibold">
          System Administration
        </p>

        <h1 className="text-3xl font-bold mt-1">
          Admin Control Center
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, platform activity, system health
          and security from one centralized dashboard.
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (

            <div
              key={index}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >

                  <Icon size={24} />

                </div>

                <span className="text-green-600 text-sm font-bold">

                  {stat.change}

                </span>

              </div>


              <p className="text-gray-500 mt-5">

                {stat.title}

              </p>


              <h2 className="text-3xl font-bold mt-1">

                {stat.value}

              </h2>

            </div>

          );

        })}

      </div>


      {/* USER GROWTH + ROLE DISTRIBUTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* USER GROWTH */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-bold">

                Platform User Growth

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Registered users over the last six months

              </p>

            </div>


            <TrendingUp
              className="text-blue-600"
              size={25}
            />

          </div>


          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart
              data={userGrowthData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip
  content={<CustomTooltip />}
  wrapperStyle={{ outline: "none" }}
/>

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* ROLE DISTRIBUTION */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold">

            User Role Distribution

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            Platform users by role

          </p>


          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie

                data={roleData}

                dataKey="value"

                nameKey="name"

                outerRadius={90}

                label

              >

                {roleData.map(
                  (item, index) => (

                    <Cell

                      key={index}

                      fill={
                        roleColors[index]
                      }

                    />

                  )
                )}

              </Pie>

             <Tooltip
  content={<CustomTooltip />}
  wrapperStyle={{ outline: "none" }}
/>

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* SYSTEM STATUS + RECENT ACTIVITY */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* SYSTEM HEALTH */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

              <Server size={23} />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                System Status

              </h2>

              <p className="text-sm text-gray-500">

                Live platform monitoring

              </p>

            </div>

          </div>


          <div className="space-y-5 mt-6">


            <div>

              <div className="flex justify-between">

                <p className="font-medium">

                  Server Performance

                </p>

                <span className="text-green-600 font-bold">

                  99%

                </span>

              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">

                <div className="w-[99%] h-2 bg-green-500 rounded-full" />

              </div>

            </div>


            <div>

              <div className="flex justify-between">

                <p className="font-medium">

                  Database Health

                </p>

                <span className="text-blue-600 font-bold">

                  96%

                </span>

              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">

                <div className="w-[96%] h-2 bg-blue-500 rounded-full" />

              </div>

            </div>


            <div>

              <div className="flex justify-between">

                <p className="font-medium">

                  Storage Usage

                </p>

                <span className="text-orange-600 font-bold">

                  68%

                </span>

              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">

                <div className="w-[68%] h-2 bg-orange-500 rounded-full" />

              </div>

            </div>

          </div>

        </div>


        {/* RECENT ACTIVITY */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold">

            Recent System Activity

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            Latest activity across the platform

          </p>


          <div className="space-y-4 mt-6">

            {recentActivities.map(
              (activity, index) => (

                <div

                  key={index}

                  className="flex items-start justify-between border rounded-xl p-4"

                >

                  <div>

                    <p className="font-semibold">

                      {activity.title}

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      {activity.user}
                      {" • "}
                      {activity.time}

                    </p>

                  </div>


                  <span

                    className={
                      activity.status === "Success"

                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"

                        : activity.status === "Pending"

                        ? "bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs"

                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                    }

                  >

                    {activity.status}

                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </div>


      {/* AI ADMIN INSIGHT */}

      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-7 text-white">

        <div className="flex items-start gap-4">

          <div className="bg-white/10 p-3 rounded-xl">

            <Activity size={27} />

          </div>


          <div>

            <p className="text-blue-200 text-sm">

              AI System Insight

            </p>

            <h2 className="text-2xl font-bold mt-1">

              Platform Performance is Stable

            </h2>

            <p className="text-slate-200 mt-3 max-w-4xl">

              User activity increased by 12.8% this month.
              System health remains above 99%.
              Review the 18 pending accounts and investigate
              the unusual login activity for improved security.

            </p>

          </div>

        </div>

      </div>


    </div>

  );

}


export default AdminOverview;