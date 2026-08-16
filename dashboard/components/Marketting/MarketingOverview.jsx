import React from "react";
import {
  Megaphone,
  Users,
  TrendingUp,
  Target,
  IndianRupee,
  MousePointerClick,
  ArrowUpRight,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
const cards = [
  {
    title: "Active Campaigns",
    value: "18",
    change: "+4 this month",
    icon: <Megaphone size={25} />,
    color: "bg-blue-600",
  },
  {
    title: "Audience Reach",
    value: "2.4M",
    change: "+18.6% growth",
    icon: <Users size={25} />,
    color: "bg-emerald-600",
  },
  {
    title: "Engagement Rate",
    value: "8.7%",
    change: "+1.2% improvement",
    icon: <TrendingUp size={25} />,
    color: "bg-purple-600",
  },
  {
    title: "Conversions",
    value: "4,250",
    change: "+14.8% growth",
    icon: <Target size={25} />,
    color: "bg-orange-500",
  },
  {
    title: "Marketing ROI",
    value: "164%",
    change: "+26% compared to last month",
    icon: <IndianRupee size={25} />,
    color: "bg-pink-600",
  },
  {
    title: "Campaign Clicks",
    value: "82.6K",
    change: "+21.4% growth",
    icon: <MousePointerClick size={25} />,
    color: "bg-cyan-600",
  },
];

const growthData = [
  { month: "Jan", reach: 1.1, leads: 620, conversions: 180 },
  { month: "Feb", reach: 1.4, leads: 780, conversions: 230 },
  { month: "Mar", reach: 1.7, leads: 980, conversions: 310 },
  { month: "Apr", reach: 1.9, leads: 1160, conversions: 380 },
  { month: "May", reach: 2.2, leads: 1390, conversions: 460 },
  { month: "Jun", reach: 2.4, leads: 1620, conversions: 540 },
];

const channelData = [
  { channel: "Instagram", reach: 820 },
  { channel: "YouTube", reach: 690 },
  { channel: "Facebook", reach: 510 },
  { channel: "LinkedIn", reach: 380 },
];

const campaigns = [
  {
    name: "Summer Product Launch",
    reach: "820K",
    engagement: "9.4%",
    roi: "188%",
    status: "Excellent",
  },
  {
    name: "AI Awareness Campaign",
    reach: "640K",
    engagement: "8.6%",
    roi: "164%",
    status: "Excellent",
  },
  {
    name: "Festival Promotion",
    reach: "510K",
    engagement: "7.2%",
    roi: "132%",
    status: "Good",
  },
  {
    name: "Brand Awareness",
    reach: "280K",
    engagement: "4.8%",
    roi: "78%",
    status: "Needs Attention",
  },
];

const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  color: "#0F172A",
  fontSize: "14px",
};

function MarketingOverview() {
  return (
    <div className="space-y-7">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <p className="text-sm font-semibold text-blue-600">
            MARKETING INTELLIGENCE
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Marketing Team Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor campaigns, audience reach, conversions and marketing performance.
          </p>

        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2">

          Create Campaign

          <ArrowUpRight size={18} />

        </button>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}
              >

                {card.icon}

              </div>

            </div>

            <p className="text-sm font-semibold text-emerald-600 mt-4">

              {card.change}

            </p>

          </div>

        ))}

      </div>


      {/* GROWTH CHART */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <h2 className="text-xl font-bold text-slate-900">
          Marketing Growth Performance
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-5">
          Reach, leads and conversions over the last six months
        </p>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={growthData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
  content={<CustomTooltip />}
  wrapperStyle={{ outline: "none" }}
/>

            <Legend />

            <Line
              type="monotone"
              dataKey="reach"
              stroke="#2563EB"
              strokeWidth={3}
              name="Reach (Millions)"
            />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#9333EA"
              strokeWidth={3}
              name="Marketing Leads"
            />

            <Line
              type="monotone"
              dataKey="conversions"
              stroke="#059669"
              strokeWidth={3}
              name="Conversions"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* CHANNEL PERFORMANCE + MARKETING FUNNEL */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <h2 className="text-xl font-bold">
            Channel Performance
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-5">
            Audience reach across marketing platforms
          </p>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={channelData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="channel" />

              <YAxis />

              <Tooltip
  content={<CustomTooltip />}
  wrapperStyle={{ outline: "none" }}
/>

              <Bar
                dataKey="reach"
                fill="#2563EB"
                radius={[8, 8, 0, 0]}
                name="Reach (Thousands)"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <h2 className="text-xl font-bold">
            Marketing Conversion Funnel
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Track how audiences move from reach to conversion
          </p>

          <div className="space-y-5">

            <div>

              <div className="flex justify-between text-sm mb-2">

                <span className="font-semibold">
                  Total Reach
                </span>

                <span>
                  2.4M
                </span>

              </div>

              <div className="h-3 bg-blue-100 rounded-full">

                <div className="h-3 bg-blue-600 rounded-full w-full" />

              </div>

            </div>


            <div>

              <div className="flex justify-between text-sm mb-2">

                <span className="font-semibold">
                  Campaign Clicks
                </span>

                <span>
                  82.6K
                </span>

              </div>

              <div className="h-3 bg-purple-100 rounded-full">

                <div className="h-3 bg-purple-600 rounded-full w-[68%]" />

              </div>

            </div>


            <div>

              <div className="flex justify-between text-sm mb-2">

                <span className="font-semibold">
                  Generated Leads
                </span>

                <span>
                  1,620
                </span>

              </div>

              <div className="h-3 bg-orange-100 rounded-full">

                <div className="h-3 bg-orange-500 rounded-full w-[45%]" />

              </div>

            </div>


            <div>

              <div className="flex justify-between text-sm mb-2">

                <span className="font-semibold">
                  Successful Conversions
                </span>

                <span>
                  540
                </span>

              </div>

              <div className="h-3 bg-emerald-100 rounded-full">

                <div className="h-3 bg-emerald-600 rounded-full w-[28%]" />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* CAMPAIGN TABLE + AI INSIGHTS */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <h2 className="text-xl font-bold mb-5">
            Top Campaign Performance
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="bg-slate-50 border-b">

                  <th className="text-left p-4">
                    Campaign
                  </th>

                  <th className="text-left p-4">
                    Reach
                  </th>

                  <th className="text-left p-4">
                    Engagement
                  </th>

                  <th className="text-left p-4">
                    ROI
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {campaigns.map((campaign, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">

                      {campaign.name}

                    </td>

                    <td className="p-4">

                      {campaign.reach}

                    </td>

                    <td className="p-4 text-emerald-600 font-semibold">

                      {campaign.engagement}

                    </td>

                    <td className="p-4 text-blue-600 font-bold">

                      {campaign.roi}

                    </td>

                    <td className="p-4">

                      <span
                        className={
                          campaign.status === "Excellent"
                            ? "px-3 py-1 rounded-full bg-emerald-100 text-emerald-700"
                            : campaign.status === "Good"
                            ? "px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                            : "px-3 py-1 rounded-full bg-red-100 text-red-700"
                        }
                      >

                        {campaign.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* AI INSIGHTS */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-2 mb-5">

            <Lightbulb
              className="text-yellow-500"
              size={24}
            />

            <h2 className="text-xl font-bold">
              AI Marketing Insights
            </h2>

          </div>

          <div className="space-y-4">

            <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4">

              <p className="font-bold text-emerald-800">

                Best Performing Campaign

              </p>

              <p className="text-sm text-emerald-700 mt-2">

                Summer Product Launch achieved
                the highest engagement and ROI.

              </p>

            </div>


            <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">

              <p className="font-bold text-blue-800">

                Growth Opportunity

              </p>

              <p className="text-sm text-blue-700 mt-2">

                Short-form video campaigns
                are generating higher conversions.

              </p>

            </div>


            <div className="border border-orange-200 bg-orange-50 rounded-xl p-4">

              <div className="flex gap-2">

                <AlertTriangle
                  size={18}
                  className="text-orange-600"
                />

                <p className="font-bold text-orange-800">

                  Attention Required

                </p>

              </div>

              <p className="text-sm text-orange-700 mt-2">

                Brand Awareness campaign
                has low engagement and needs
                improved audience targeting.

              </p>

            </div>

          </div>

        </div>

      </div>
{/* ========================================= */}
{/* MARKETING HEALTH + BUDGET */}
{/* ========================================= */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

  {/* CAMPAIGN HEALTH SCORE */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold text-slate-500">
          Overall Campaign Health
        </p>

        <h2 className="text-4xl font-bold text-emerald-600 mt-3">
          91%
        </h2>

        <p className="text-sm text-emerald-600 font-semibold mt-2">
          Excellent performance
        </p>

      </div>

      <div className="w-24 h-24 rounded-full border-[10px] border-emerald-500 flex items-center justify-center">

        <span className="font-bold text-xl">
          A+
        </span>

      </div>

    </div>

    <div className="mt-5">

      <div className="flex justify-between text-sm mb-2">

        <span>
          Campaign Quality
        </span>

        <span className="font-bold">
          91%
        </span>

      </div>

      <div className="h-2 bg-slate-200 rounded-full">

        <div className="h-2 w-[91%] bg-emerald-500 rounded-full" />

      </div>

    </div>

  </div>


  {/* MARKETING BUDGET */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <p className="text-sm font-semibold text-slate-500">
      Monthly Marketing Budget
    </p>

    <h2 className="text-3xl font-bold mt-3">
      ₹8.5L
    </h2>

    <div className="flex justify-between text-sm mt-5">

      <span className="text-slate-500">
        Used: ₹6.2L
      </span>

      <span className="font-bold text-blue-600">
        73%
      </span>

    </div>

    <div className="h-3 bg-blue-100 rounded-full mt-2">

      <div className="h-3 w-[73%] bg-blue-600 rounded-full" />

    </div>

    <p className="text-sm text-slate-500 mt-4">

      ₹2.3L budget remaining for
      upcoming campaigns.

    </p>

  </div>


  {/* BEST POSTING TIME */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <p className="text-sm font-semibold text-slate-500">
      Best Campaign Time
    </p>

    <h2 className="text-3xl font-bold mt-3">
      7 PM – 9 PM
    </h2>

    <p className="text-emerald-600 font-semibold text-sm mt-2">
      +24% higher engagement
    </p>

    <div className="mt-5 grid grid-cols-4 gap-2">

      <div className="h-12 rounded-lg bg-blue-100" />

      <div className="h-12 rounded-lg bg-blue-200" />

      <div className="h-12 rounded-lg bg-blue-500" />

      <div className="h-12 rounded-lg bg-blue-300" />

    </div>

    <p className="text-xs text-slate-500 mt-3">

      Peak audience activity detected
      during evening hours.

    </p>

  </div>

</div>


{/* ========================================= */}
{/* MARKETING GOALS */}
{/* ========================================= */}

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div>

      <h2 className="text-xl font-bold">
        Marketing Goals Progress
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Track monthly marketing targets and achievements.
      </p>

    </div>

    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">

      June 2026 Goals

    </span>

  </div>


  <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-7">


    {/* REACH GOAL */}

    <div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Audience Reach
        </span>

        <span className="font-bold">
          80%
        </span>

      </div>

      <p className="text-sm text-slate-500 mt-1">

        2.4M / 3M target

      </p>

      <div className="h-3 bg-slate-200 rounded-full mt-3">

        <div className="h-3 w-[80%] bg-blue-600 rounded-full" />

      </div>

    </div>


    {/* LEAD GOAL */}

    <div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Lead Generation
        </span>

        <span className="font-bold">
          81%
        </span>

      </div>

      <p className="text-sm text-slate-500 mt-1">

        1,620 / 2,000 target

      </p>

      <div className="h-3 bg-slate-200 rounded-full mt-3">

        <div className="h-3 w-[81%] bg-purple-600 rounded-full" />

      </div>

    </div>


    {/* CONVERSION GOAL */}

    <div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Conversions
        </span>

        <span className="font-bold">
          90%
        </span>

      </div>

      <p className="text-sm text-slate-500 mt-1">

        540 / 600 target

      </p>

      <div className="h-3 bg-slate-200 rounded-full mt-3">

        <div className="h-3 w-[90%] bg-emerald-600 rounded-full" />

      </div>

    </div>

  </div>

</div>


{/* ========================================= */}
{/* UPCOMING CAMPAIGNS + ALERTS */}
{/* ========================================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


  {/* UPCOMING CAMPAIGNS */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <div className="flex justify-between items-center mb-5">

      <div>

        <h2 className="text-xl font-bold">
          Upcoming Campaigns
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Scheduled marketing activities
        </p>

      </div>

      <button className="text-blue-600 font-semibold text-sm">

        View All

      </button>

    </div>


    <div className="space-y-4">


      <div className="flex items-center justify-between border rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">

            08

          </div>

          <div>

            <p className="font-bold">
              Product Launch Campaign
            </p>

            <p className="text-sm text-slate-500">
              Starts on August 08
            </p>

          </div>

        </div>

        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">

          Scheduled

        </span>

      </div>


      <div className="flex items-center justify-between border rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">

            15

          </div>

          <div>

            <p className="font-bold">
              Influencer Collaboration
            </p>

            <p className="text-sm text-slate-500">
              Starts on August 15
            </p>

          </div>

        </div>

        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">

          Planning

        </span>

      </div>


      <div className="flex items-center justify-between border rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">

            22

          </div>

          <div>

            <p className="font-bold">
              Festival Promotion
            </p>

            <p className="text-sm text-slate-500">
              Starts on August 22
            </p>

          </div>

        </div>

        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">

          Draft

        </span>

      </div>

    </div>

  </div>


  {/* PERFORMANCE ALERTS */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Marketing Alerts
    </h2>

    <p className="text-sm text-slate-500 mt-1 mb-5">
      Important campaign updates requiring attention
    </p>


    <div className="space-y-4">


      <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-r-xl p-4">

        <p className="font-bold text-emerald-800">

          Campaign Target Achieved

        </p>

        <p className="text-sm text-emerald-700 mt-1">

          Summer Product Launch exceeded
          its reach target by 18%.

        </p>

      </div>


      <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-4">

        <p className="font-bold text-orange-800">

          Budget Usage Alert

        </p>

        <p className="text-sm text-orange-700 mt-1">

          AI Awareness Campaign has used
          88% of its allocated budget.

        </p>

      </div>


      <div className="border-l-4 border-red-500 bg-red-50 rounded-r-xl p-4">

        <p className="font-bold text-red-800">

          Low Engagement Detected

        </p>

        <p className="text-sm text-red-700 mt-1">

          Brand Awareness campaign engagement
          dropped below the expected target.

        </p>

      </div>

    </div>

  </div>

</div>
    </div>
  );
}

export default MarketingOverview;