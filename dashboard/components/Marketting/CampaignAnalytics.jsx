import React, { useState } from "react";

import {
  Megaphone,
  IndianRupee,
  Target,
  TrendingUp,
  MousePointerClick,
  Users,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
const campaignCards = [
  {
    title: "Active Campaigns",
    value: "18",
    change: "+4 this month",
    icon: <Megaphone size={25} />,
    color: "bg-blue-600",
  },

  {
    title: "Total Budget",
    value: "₹8.5L",
    change: "Monthly allocation",
    icon: <IndianRupee size={25} />,
    color: "bg-purple-600",
  },

  {
    title: "Budget Used",
    value: "₹6.2L",
    change: "73% utilized",
    icon: <Target size={25} />,
    color: "bg-orange-500",
  },

  {
    title: "Average ROI",
    value: "164%",
    change: "+26% growth",
    icon: <TrendingUp size={25} />,
    color: "bg-emerald-600",
  },

  {
    title: "Campaign Clicks",
    value: "82.6K",
    change: "+21% growth",
    icon: <MousePointerClick size={25} />,
    color: "bg-cyan-600",
  },

  {
    title: "Conversions",
    value: "4,250",
    change: "8.4% conversion rate",
    icon: <Users size={25} />,
    color: "bg-pink-600",
  },
];


const budgetData = [
  {
    campaign: "Summer",
    budget: 220,
    spent: 185,
  },

  {
    campaign: "AI Launch",
    budget: 180,
    spent: 150,
  },

  {
    campaign: "Festival",
    budget: 160,
    spent: 122,
  },

  {
    campaign: "Brand",
    budget: 140,
    spent: 108,
  },
];


const performanceData = [
  {
    month: "Jan",
    reach: 1.1,
    conversions: 620,
  },

  {
    month: "Feb",
    reach: 1.4,
    conversions: 780,
  },

  {
    month: "Mar",
    reach: 1.7,
    conversions: 980,
  },

  {
    month: "Apr",
    reach: 2.0,
    conversions: 1180,
  },

  {
    month: "May",
    reach: 2.2,
    conversions: 1390,
  },

  {
    month: "Jun",
    reach: 2.4,
    conversions: 1620,
  },
];


const platformData = [
  {
    name: "Instagram",
    value: 38,
    color: "#2563EB",
  },

  {
    name: "YouTube",
    value: 28,
    color: "#DC2626",
  },

  {
    name: "Facebook",
    value: 20,
    color: "#7C3AED",
  },

  {
    name: "LinkedIn",
    value: 14,
    color: "#0891B2",
  },
];


const campaignList = [
  {
    name: "Summer Product Launch",
    platform: "Instagram",
    budget: "₹2.2L",
    spent: "₹1.85L",
    reach: "820K",
    conversions: "1,240",
    roi: "188%",
    progress: 92,
    status: "Excellent",
  },

  {
    name: "AI Product Awareness",
    platform: "YouTube",
    budget: "₹1.8L",
    spent: "₹1.5L",
    reach: "640K",
    conversions: "980",
    roi: "164%",
    progress: 76,
    status: "Excellent",
  },

  {
    name: "Festival Promotion",
    platform: "Facebook",
    budget: "₹1.6L",
    spent: "₹1.22L",
    reach: "510K",
    conversions: "720",
    roi: "132%",
    progress: 68,
    status: "Good",
  },

  {
    name: "Brand Awareness",
    platform: "LinkedIn",
    budget: "₹1.4L",
    spent: "₹1.08L",
    reach: "280K",
    conversions: "340",
    roi: "78%",
    progress: 48,
    status: "Needs Attention",
  },
];


const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  color: "#0F172A",
};


function CampaignAnalytics() {
  const [campaignBudget, setCampaignBudget] = useState(200000);

const expectedReach = Math.round(campaignBudget * 12.5);

const expectedClicks = Math.round(
  expectedReach * 0.045
);

const expectedConversions = Math.round(
  expectedClicks * 0.065
);

const expectedRevenue = Math.round(
  expectedConversions * 1800
);

const expectedROI = (
  ((expectedRevenue - campaignBudget) /
    campaignBudget) *
  100
).toFixed(1);

  return (

    <div className="space-y-7">


      {/* HEADER */}

      <div>

        <p className="text-sm font-bold text-blue-600">

          CAMPAIGN INTELLIGENCE

        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">

          Campaign Analytics

        </h1>

        <p className="text-slate-500 mt-2">

          Monitor campaign budgets, performance,
          conversions and return on investment.

        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {campaignCards.map(
          (card, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-slate-500">

                    {card.title}

                  </p>

                  <h2 className="text-3xl font-bold mt-2">

                    {card.value}

                  </h2>

                </div>


                <div
                  className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}
                >

                  {card.icon}

                </div>

              </div>


              <p className="text-sm text-emerald-600 font-semibold mt-4">

                {card.change}

              </p>

            </div>

          )
        )}

      </div>


      {/* BUDGET + PLATFORM */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* BUDGET CHART */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-xl font-bold">

            Campaign Budget vs Spend

          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-5">

            Compare allocated budget with
            actual campaign spending.

          </p>


          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={budgetData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="campaign"
              />

              <YAxis />

              <Tooltip
  content={<CustomTooltip />}
  wrapperStyle={{ outline: "none" }}
/>

              <Legend />


              <Bar
                dataKey="budget"
                fill="#2563EB"
                radius={[7, 7, 0, 0]}
                name="Budget (₹K)"
              />


              <Bar
                dataKey="spent"
                fill="#9333EA"
                radius={[7, 7, 0, 0]}
                name="Spent (₹K)"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* PLATFORM PERFORMANCE */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-xl font-bold">

            Platform Contribution

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Campaign reach distribution
            across platforms.

          </p>


          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={platformData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                >

                  {platformData.map(
                    (item, index) => (

                      <Cell
                        key={index}
                        fill={item.color}
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

      </div>


      {/* PERFORMANCE TREND */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        <h2 className="text-xl font-bold">

          Campaign Performance Trend

        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-5">

          Campaign reach and conversions
          over the last six months.

        </p>


        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={performanceData}
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
              dataKey="conversions"
              stroke="#059669"
              strokeWidth={3}
              name="Conversions"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* CAMPAIGN PROGRESS */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        <h2 className="text-xl font-bold mb-5">

          Active Campaign Progress

        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {campaignList.map(
            (campaign, index) => (

              <div
                key={index}
                className="border border-slate-200 rounded-xl p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <p className="font-bold">

                      {campaign.name}

                    </p>

                    <p className="text-sm text-slate-500 mt-1">

                      {campaign.platform}

                    </p>

                  </div>


                  <span className="font-bold text-blue-600">

                    {campaign.progress}%

                  </span>

                </div>


                <div className="h-3 bg-slate-200 rounded-full mt-4">

                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{
                      width:
                        `${campaign.progress}%`,
                    }}
                  />

                </div>


                <div className="flex justify-between text-sm mt-4">

                  <span>

                    ROI:
                    <b className="text-emerald-600 ml-1">

                      {campaign.roi}

                    </b>

                  </span>


                  <span>

                    Reach:
                    <b className="ml-1">

                      {campaign.reach}

                    </b>

                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* TABLE + INSIGHTS */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* CAMPAIGN TABLE */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-xl font-bold mb-5">

            Campaign Performance Details

          </h2>


          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="bg-slate-50 border-b">

                  <th className="text-left p-4">

                    Campaign

                  </th>

                  <th className="text-left p-4">

                    Platform

                  </th>

                  <th className="text-left p-4">

                    Budget

                  </th>

                  <th className="text-left p-4">

                    Spend

                  </th>

                  <th className="text-left p-4">

                    Reach

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

                {campaignList.map(
                  (campaign, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-semibold">

                        {campaign.name}

                      </td>


                      <td className="p-4">

                        {campaign.platform}

                      </td>


                      <td className="p-4">

                        {campaign.budget}

                      </td>


                      <td className="p-4">

                        {campaign.spent}

                      </td>


                      <td className="p-4">

                        {campaign.reach}

                      </td>


                      <td className="p-4 text-emerald-600 font-bold">

                        {campaign.roi}

                      </td>


                      <td className="p-4">

                        <span
                          className={
                            campaign.status ===
                            "Excellent"

                              ? "px-3 py-1 rounded-full bg-emerald-100 text-emerald-700"

                              : campaign.status ===
                                "Good"

                              ? "px-3 py-1 rounded-full bg-blue-100 text-blue-700"

                              : "px-3 py-1 rounded-full bg-red-100 text-red-700"
                          }
                        >

                          {campaign.status}

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* AI INSIGHTS */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <div className="flex items-center gap-2 mb-5">

            <Lightbulb
              size={23}
              className="text-yellow-500"
            />

            <h2 className="text-xl font-bold">

              AI Campaign Insights

            </h2>

          </div>


          <div className="space-y-4">


            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">

              <div className="flex gap-2">

                <CheckCircle2
                  size={19}
                  className="text-emerald-600"
                />

                <p className="font-bold text-emerald-800">

                  Top Performer

                </p>

              </div>


              <p className="text-sm text-emerald-700 mt-2">

                Summer Product Launch has
                the highest ROI at 188%.

              </p>

            </div>


            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

              <p className="font-bold text-blue-800">

                Budget Opportunity

              </p>


              <p className="text-sm text-blue-700 mt-2">

                ₹35K remains in the Summer
                campaign budget. Consider
                retargeting engaged users.

              </p>

            </div>


            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">

              <div className="flex gap-2">

                <AlertTriangle
                  size={19}
                  className="text-orange-600"
                />

                <p className="font-bold text-orange-800">

                  Attention Required

                </p>

              </div>


              <p className="text-sm text-orange-700 mt-2">

                Brand Awareness has low ROI.
                Improve audience targeting
                and creative content.

              </p>

            </div>


            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">

              <p className="font-bold text-purple-800">

                Smart Recommendation

              </p>


              <p className="text-sm text-purple-700 mt-2">

                Increase Instagram campaign
                allocation because it produces
                the highest engagement.

              </p>

            </div>

          </div>

        </div>

      </div>
      {/* ===================================== */}
{/* CAMPAIGN HEALTH & RISK INTELLIGENCE */}
{/* ===================================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* CAMPAIGN HEALTH SCORE */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Campaign Health Score
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Overall campaign performance quality
    </p>

    <div className="flex items-center justify-center mt-7">

      <div className="w-40 h-40 rounded-full border-[14px] border-emerald-500 flex flex-col items-center justify-center">

        <span className="text-4xl font-bold text-emerald-600">
          91
        </span>

        <span className="text-sm text-slate-500">
          Excellent
        </span>

      </div>

    </div>

    <div className="mt-7 space-y-4">

      <div>

        <div className="flex justify-between text-sm">

          <span>
            Engagement Quality
          </span>

          <b>
            94%
          </b>

        </div>

        <div className="h-2 bg-slate-200 rounded-full mt-2">

          <div className="h-2 w-[94%] bg-emerald-500 rounded-full" />

        </div>

      </div>

      <div>

        <div className="flex justify-between text-sm">

          <span>
            Budget Efficiency
          </span>

          <b>
            87%
          </b>

        </div>

        <div className="h-2 bg-slate-200 rounded-full mt-2">

          <div className="h-2 w-[87%] bg-blue-600 rounded-full" />

        </div>

      </div>

      <div>

        <div className="flex justify-between text-sm">

          <span>
            Conversion Performance
          </span>

          <b>
            92%
          </b>

        </div>

        <div className="h-2 bg-slate-200 rounded-full mt-2">

          <div className="h-2 w-[92%] bg-purple-600 rounded-full" />

        </div>

      </div>

    </div>

  </div>


  {/* CAMPAIGN RISK DETECTOR */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Campaign Risk Detector
    </h2>

    <p className="text-sm text-slate-500 mt-1 mb-6">
      Early warnings based on campaign signals
    </p>

    <div className="space-y-4">

      <div className="border-l-4 border-red-500 bg-red-50 rounded-r-xl p-4">

        <p className="font-bold text-red-800">
          High Risk
        </p>

        <p className="text-sm text-red-700 mt-1">
          Brand Awareness campaign has low ROI
          and engagement is below target.
        </p>

        <p className="text-xs font-semibold text-red-600 mt-2">
          Risk score: 78/100
        </p>

      </div>


      <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-4">

        <p className="font-bold text-orange-800">
          Budget Warning
        </p>

        <p className="text-sm text-orange-700 mt-1">
          AI Product Awareness has used 83%
          of its budget but is only 76% complete.
        </p>

        <p className="text-xs font-semibold text-orange-600 mt-2">
          Monitor spending
        </p>

      </div>


      <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-r-xl p-4">

        <p className="font-bold text-emerald-800">
          Low Risk
        </p>

        <p className="text-sm text-emerald-700 mt-1">
          Summer Product Launch is performing
          above all expected targets.
        </p>

        <p className="text-xs font-semibold text-emerald-600 mt-2">
          Performance is stable
        </p>

      </div>

    </div>

  </div>


  {/* NEXT BEST ACTION */}

  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <h2 className="text-xl font-bold">
      🤖 Next Best Action
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      AI-based campaign optimization
    </p>

    <div className="mt-6 space-y-4">

      <div className="border rounded-xl p-4 bg-blue-50">

        <p className="font-bold text-blue-800">
          Increase Instagram Budget
        </p>

        <p className="text-sm text-blue-700 mt-2">
          Instagram generates the highest
          engagement. Shift ₹25K from
          low-performing campaigns.
        </p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">

          Apply Recommendation

        </button>

      </div>


      <div className="border rounded-xl p-4">

        <p className="font-bold">
          Improve Brand Awareness
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Test short videos and narrow
          audience targeting to improve ROI.
        </p>

      </div>


      <div className="border rounded-xl p-4">

        <p className="font-bold">
          Retarget Engaged Users
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Retarget 18,400 users who clicked
          but did not complete conversion.
        </p>

      </div>

    </div>

  </div>

</div>
{/* ===================================== */}
{/* WHAT-IF BUDGET SIMULATOR */}
{/* ===================================== */}

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

    <div>

      <h2 className="text-2xl font-bold">
        🧠 What-If Budget Simulator
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Adjust the campaign budget to predict
        reach, clicks, conversions and ROI.
      </p>

    </div>

    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">

      <p className="text-xs text-blue-600">
        Selected Budget
      </p>

      <p className="text-2xl font-bold text-blue-700">

        ₹{campaignBudget.toLocaleString("en-IN")}

      </p>

    </div>

  </div>


  {/* BUDGET SLIDER */}

  <div className="mt-8">

    <div className="flex justify-between text-sm font-semibold">

      <span>
        ₹50,000
      </span>

      <span>
        ₹5,00,000
      </span>

    </div>

    <input
      type="range"
      min="50000"
      max="500000"
      step="10000"
      value={campaignBudget}
      onChange={(e) =>
        setCampaignBudget(
          Number(e.target.value)
        )
      }
      className="w-full mt-3 accent-blue-600"
    />

  </div>


  {/* PREDICTION CARDS */}

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">


    <div className="rounded-xl border border-slate-200 p-5">

      <p className="text-sm text-slate-500">
        Expected Reach
      </p>

      <h3 className="text-2xl font-bold mt-2">

        {expectedReach.toLocaleString("en-IN")}

      </h3>

      <p className="text-xs text-green-600 mt-2">
        AI estimated audience
      </p>

    </div>


    <div className="rounded-xl border border-slate-200 p-5">

      <p className="text-sm text-slate-500">
        Expected Clicks
      </p>

      <h3 className="text-2xl font-bold mt-2">

        {expectedClicks.toLocaleString("en-IN")}

      </h3>

      <p className="text-xs text-blue-600 mt-2">
        Estimated click-through
      </p>

    </div>


    <div className="rounded-xl border border-slate-200 p-5">

      <p className="text-sm text-slate-500">
        Expected Conversions
      </p>

      <h3 className="text-2xl font-bold mt-2">

        {expectedConversions.toLocaleString("en-IN")}

      </h3>

      <p className="text-xs text-purple-600 mt-2">
        Predicted successful actions
      </p>

    </div>


    <div className="rounded-xl border border-slate-200 p-5">

      <p className="text-sm text-slate-500">
        Predicted ROI
      </p>

      <h3 className="text-2xl font-bold mt-2">

        {expectedROI}%

      </h3>

      <p className="text-xs text-emerald-600 mt-2">
        Estimated return on investment
      </p>

    </div>

  </div>


  {/* AI RECOMMENDATION */}

  <div className="mt-7 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-5">

    <h3 className="font-bold text-lg">

      🤖 AI Budget Recommendation

    </h3>

    <p className="text-sm text-slate-600 mt-2">

      {campaignBudget < 150000
        ? "The current budget may limit campaign reach. Increasing the budget can improve audience coverage."
        : campaignBudget < 300000
        ? "This budget provides a balanced combination of reach, conversions and cost efficiency."
        : "The selected budget can generate high reach. Monitor conversion performance to avoid inefficient spending."}

    </p>

  </div>

</div>

    </div>

  );

}


export default CampaignAnalytics;