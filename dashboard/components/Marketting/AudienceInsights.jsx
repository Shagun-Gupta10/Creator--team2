import React from "react";
import {
  Users,
  MapPin,
  Clock,
  Heart,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";

const ageGroups = [
  { group: "18–24", users: "45%", value: 45 },
  { group: "25–34", users: "32%", value: 32 },
  { group: "35–44", users: "15%", value: 15 },
  { group: "45+", users: "8%", value: 8 },
];

const locations = [
  { city: "Chennai", audience: "28%", users: "672K" },
  { city: "Bengaluru", audience: "21%", users: "504K" },
  { city: "Mumbai", audience: "18%", users: "432K" },
  { city: "Coimbatore", audience: "12%", users: "288K" },
];

const interests = [
  { name: "Technology", value: 82 },
  { name: "Fashion & Lifestyle", value: 74 },
  { name: "Entertainment", value: 69 },
  { name: "Fitness & Wellness", value: 58 },
];

function AudienceInsights() {
  const activityData = [
  { time: "6 AM", activity: 35 },
  { time: "9 AM", activity: 62 },
  { time: "12 PM", activity: 78 },
  { time: "3 PM", activity: 54 },
  { time: "6 PM", activity: 92 },
  { time: "9 PM", activity: 86 },
];

const locationOpportunities = [
  {
    city: "Chennai",
    audience: "420K",
    growth: "+18%",
    opportunity: "High",
  },
  {
    city: "Bengaluru",
    audience: "380K",
    growth: "+15%",
    opportunity: "High",
  },
  {
    city: "Mumbai",
    audience: "510K",
    growth: "+9%",
    opportunity: "Medium",
  },
  {
    city: "Hyderabad",
    audience: "290K",
    growth: "+21%",
    opportunity: "Very High",
  },
];
  const audienceGrowth = [
  { month: "Jan", audience: 1.72 },
  { month: "Feb", audience: 1.84 },
  { month: "Mar", audience: 1.96 },
  { month: "Apr", audience: 2.08 },
  { month: "May", audience: 2.23 },
  { month: "Jun", audience: 2.4 },
];

const audienceSegments = [
  {
    segment: "High-Value Audience",
    description: "18–34 technology users",
    audience: "620K",
    conversion: "12.8%",
    status: "Best Segment",
  },
  {
    segment: "Growth Opportunity",
    description: "35–44 lifestyle users",
    audience: "360K",
    conversion: "8.4%",
    status: "Growing",
  },
  {
    segment: "Re-engagement",
    description: "Previously active users",
    audience: "210K",
    conversion: "4.2%",
    status: "Needs Attention",
  },
];
  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <p className="text-sm font-semibold text-blue-600">
          Audience Intelligence
        </p>

        <h1 className="text-3xl font-bold mt-1">
          Audience Insights
        </h1>

        <p className="text-gray-500 mt-2">
          Understand audience demographics, interests,
          locations and engagement behaviour.
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Audience
              </p>

              <h2 className="text-3xl font-bold mt-2">
                2.4M
              </h2>

              <p className="text-sm text-green-600 mt-2">
                +14.2% growth
              </p>

            </div>

            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

              <Users size={25} />

            </div>

          </div>

        </div>


        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Engaged Audience
              </p>

              <h2 className="text-3xl font-bold mt-2">
                1.68M
              </h2>

              <p className="text-sm text-green-600 mt-2">
                70% engagement
              </p>

            </div>

            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">

              <Heart size={25} />

            </div>

          </div>

        </div>


        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Top Age Group
              </p>

              <h2 className="text-3xl font-bold mt-2">
                18–24
              </h2>

              <p className="text-sm text-blue-600 mt-2">
                45% of audience
              </p>

            </div>

            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">

              <Target size={25} />

            </div>

          </div>

        </div>


        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Peak Activity
              </p>

              <h2 className="text-3xl font-bold mt-2">
                7–9 PM
              </h2>

              <p className="text-sm text-green-600 mt-2">
                Highest engagement
              </p>

            </div>

            <div className="bg-green-100 text-green-600 p-3 rounded-xl">

              <Clock size={25} />

            </div>

          </div>

        </div>

      </div>


      {/* AGE + GENDER */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* AGE DISTRIBUTION */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold">
            Age Distribution
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Audience percentage by age group
          </p>

          <div className="space-y-5">

            {ageGroups.map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {item.group}
                  </span>

                  <span className="font-bold">
                    {item.users}
                  </span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full">

                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* GENDER DISTRIBUTION */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold">
            Gender Distribution
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Audience breakdown by gender
          </p>

          <div className="space-y-5">

            <div>

              <div className="flex justify-between">

                <span>
                  Female
                </span>

                <b>
                  54%
                </b>

              </div>

              <div className="h-4 bg-gray-200 rounded-full mt-2">

                <div className="h-4 bg-pink-500 rounded-full w-[54%]" />

              </div>

            </div>


            <div>

              <div className="flex justify-between">

                <span>
                  Male
                </span>

                <b>
                  42%
                </b>

              </div>

              <div className="h-4 bg-gray-200 rounded-full mt-2">

                <div className="h-4 bg-blue-600 rounded-full w-[42%]" />

              </div>

            </div>


            <div>

              <div className="flex justify-between">

                <span>
                  Other / Not Specified
                </span>

                <b>
                  4%
                </b>

              </div>

              <div className="h-4 bg-gray-200 rounded-full mt-2">

                <div className="h-4 bg-purple-600 rounded-full w-[4%]" />

              </div>

            </div>

          </div>


          <div className="mt-8 bg-blue-50 rounded-xl p-4">

            <p className="font-semibold text-blue-800">

              Audience Insight

            </p>

            <p className="text-sm text-blue-700 mt-2">

              Female users aged 18–34 generate
              the highest engagement.

            </p>

          </div>

        </div>

      </div>


      {/* LOCATIONS + INTERESTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* TOP LOCATIONS */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center gap-2">

            <MapPin className="text-red-500" />

            <h2 className="text-xl font-bold">
              Top Audience Locations
            </h2>

          </div>

          <div className="mt-6 space-y-4">

            {locations.map((location, index) => (

              <div
                key={index}
                className="flex items-center justify-between border rounded-xl p-4"
              >

                <div>

                  <p className="font-semibold">

                    {location.city}

                  </p>

                  <p className="text-sm text-gray-500">

                    {location.users} users

                  </p>

                </div>

                <span className="font-bold text-blue-600">

                  {location.audience}

                </span>

              </div>

            ))}

          </div>

        </div>


        {/* INTERESTS */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold">

            Audience Interests

          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">

            Content categories preferred by
            your target audience

          </p>

          <div className="space-y-5">

            {interests.map((interest, index) => (

              <div key={index}>

                <div className="flex justify-between">

                  <span className="font-medium">

                    {interest.name}

                  </span>

                  <b>

                    {interest.value}%

                  </b>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-2">

                  <div
                    className="h-3 bg-purple-600 rounded-full"
                    style={{
                      width: `${interest.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* AI INSIGHTS */}

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-7 text-white">

        <div className="flex items-center gap-3">

          <Sparkles size={27} />

          <h2 className="text-2xl font-bold">

            AI Audience Recommendations

          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

          <div className="bg-white/15 rounded-xl p-5">

            <h3 className="font-bold">

              Best Content

            </h3>

            <p className="text-sm mt-2">

              Create short technology videos
              to attract the largest audience
              segment.

            </p>

          </div>


          <div className="bg-white/15 rounded-xl p-5">

            <h3 className="font-bold">

              Best Posting Time

            </h3>

            <p className="text-sm mt-2">

              Publish content between 7 PM
              and 9 PM for higher engagement.

            </p>

          </div>


          <div className="bg-white/15 rounded-xl p-5">

            <h3 className="font-bold">

              Growth Opportunity

            </h3>

            <p className="text-sm mt-2">

              Increase campaigns targeting
              Bengaluru and Mumbai audiences.

            </p>

          </div>

        </div>

      </div>
      {/* ================================= */}
{/* AUDIENCE GROWTH TREND */}
{/* ================================= */}

<div className="bg-white rounded-2xl border shadow-sm p-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div>

      <h2 className="text-xl font-bold">
        Audience Growth Trend
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Monthly audience growth across marketing campaigns
      </p>

    </div>

    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-semibold">

      +39.5% Growth

    </div>

  </div>

  <div className="grid grid-cols-6 gap-3 mt-8 items-end h-48">

    {audienceGrowth.map((item, index) => (

      <div
        key={index}
        className="flex flex-col items-center justify-end h-full"
      >

        <span className="text-xs font-bold mb-2">

          {item.audience}M

        </span>

        <div
          className="w-full max-w-[55px] bg-blue-600 rounded-t-xl hover:bg-blue-700 transition-all"
          style={{
            height: `${item.audience * 60}px`,
          }}
        />

        <span className="text-sm text-gray-500 mt-3">

          {item.month}

        </span>

      </div>

    ))}

  </div>

</div>


{/* ================================= */}
{/* AUDIENCE QUALITY + RETENTION */}
{/* ================================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  <div className="bg-white rounded-2xl border shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Audience Quality Score
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Quality based on engagement, retention and conversion
    </p>

    <div className="flex justify-center mt-7">

      <div className="w-40 h-40 rounded-full border-[14px] border-blue-600 flex flex-col items-center justify-center">

        <span className="text-4xl font-bold text-blue-700">

          89

        </span>

        <span className="text-sm text-gray-500">

          Excellent

        </span>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-3 mt-7 text-center">

      <div className="bg-blue-50 rounded-xl p-3">

        <p className="text-xs text-gray-500">
          Engagement
        </p>

        <p className="font-bold text-blue-700">
          91%
        </p>

      </div>

      <div className="bg-purple-50 rounded-xl p-3">

        <p className="text-xs text-gray-500">
          Retention
        </p>

        <p className="font-bold text-purple-700">
          84%
        </p>

      </div>

      <div className="bg-green-50 rounded-xl p-3">

        <p className="text-xs text-gray-500">
          Conversion
        </p>

        <p className="font-bold text-green-700">
          92%
        </p>

      </div>

    </div>

  </div>


  <div className="bg-white rounded-2xl border shadow-sm p-6">

    <h2 className="text-xl font-bold">
      New vs Returning Audience
    </h2>

    <p className="text-sm text-gray-500 mt-1 mb-7">
      Audience retention and acquisition performance
    </p>

    <div className="space-y-6">

      <div>

        <div className="flex justify-between">

          <span className="font-medium">
            Returning Audience
          </span>

          <b>
            68%
          </b>

        </div>

        <div className="h-4 bg-gray-200 rounded-full mt-2">

          <div className="h-4 bg-purple-600 rounded-full w-[68%]" />

        </div>

      </div>

      <div>

        <div className="flex justify-between">

          <span className="font-medium">
            New Audience
          </span>

          <b>
            32%
          </b>

        </div>

        <div className="h-4 bg-gray-200 rounded-full mt-2">

          <div className="h-4 bg-green-600 rounded-full w-[32%]" />

        </div>

      </div>

    </div>

    <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-4">

      <p className="font-bold text-amber-800">

        Retention Opportunity

      </p>

      <p className="text-sm text-amber-700 mt-2">

        32% of users are new. Use follow-up campaigns
        to convert them into returning audiences.

      </p>

    </div>

  </div>

</div>


{/* ================================= */}
{/* HIGH-VALUE AUDIENCE SEGMENTS */}
{/* ================================= */}

<div className="bg-white rounded-2xl border shadow-sm p-6">

  <h2 className="text-xl font-bold">
    High-Value Audience Segments
  </h2>

  <p className="text-sm text-gray-500 mt-1 mb-6">
    Identify audience groups with the strongest conversion potential
  </p>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-gray-50">

        <tr>

          <th className="text-left p-4">
            Segment
          </th>

          <th className="text-left p-4">
            Audience Profile
          </th>

          <th className="text-left p-4">
            Audience Size
          </th>

          <th className="text-left p-4">
            Conversion
          </th>

          <th className="text-left p-4">
            Opportunity
          </th>

        </tr>

      </thead>

      <tbody>

        {audienceSegments.map((item, index) => (

          <tr
            key={index}
            className="border-t hover:bg-gray-50"
          >

            <td className="p-4 font-semibold">

              {item.segment}

            </td>

            <td className="p-4">

              {item.description}

            </td>

            <td className="p-4">

              {item.audience}

            </td>

            <td className="p-4 text-green-600 font-bold">

              {item.conversion}

            </td>

            <td className="p-4">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                {item.status}

              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
{/* ================================= */}
{/* AUDIENCE ACTIVITY TIME */}
{/* ================================= */}

<div className="bg-white rounded-2xl border shadow-sm p-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div>

      <h2 className="text-xl font-bold">
        Audience Activity Time
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Identify when your audience is most active
      </p>

    </div>

    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold">

      Best Time: 6 PM – 9 PM

    </div>

  </div>

  <div className="grid grid-cols-6 gap-4 mt-8 h-52 items-end">

    {activityData.map((item, index) => (

      <div
        key={index}
        className="flex flex-col items-center justify-end h-full"
      >

        <span className="text-xs font-bold mb-2">

          {item.activity}%

        </span>

        <div
          className="w-full max-w-[60px] rounded-t-xl bg-gradient-to-t from-blue-700 to-purple-500 hover:scale-105 transition-transform"
          style={{
            height: `${item.activity * 1.7}px`,
          }}
        />

        <span className="text-xs text-gray-500 mt-3">

          {item.time}

        </span>

      </div>

    ))}

  </div>

</div>


{/* ================================= */}
{/* LOCATION OPPORTUNITIES */}
{/* ================================= */}

<div className="bg-white rounded-2xl border shadow-sm p-6">

  <h2 className="text-xl font-bold">
    Location Growth Opportunities
  </h2>

  <p className="text-sm text-gray-500 mt-1 mb-6">
    Cities with strong audience growth and campaign potential
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

    {locationOpportunities.map((location, index) => (

      <div
        key={index}
        className="border rounded-2xl p-5 hover:shadow-md transition-shadow"
      >

        <div className="flex items-center justify-between">

          <h3 className="font-bold text-lg">

            📍 {location.city}

          </h3>

          <span
            className={
              location.opportunity === "Very High"
                ? "px-2 py-1 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold"
                : location.opportunity === "High"
                ? "px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold"
                : "px-2 py-1 rounded-lg bg-orange-100 text-orange-700 text-xs font-bold"
            }
          >

            {location.opportunity}

          </span>

        </div>

        <p className="text-sm text-gray-500 mt-5">

          Audience Size

        </p>

        <p className="text-2xl font-bold">

          {location.audience}

        </p>

        <p className="text-green-600 font-semibold mt-3">

          {location.growth} growth

        </p>

      </div>

    ))}

  </div>

</div>


{/* ================================= */}
{/* AUDIENCE MATCH + OVERLAP */}
{/* ================================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* CAMPAIGN AUDIENCE MATCH */}

  <div className="bg-white rounded-2xl border shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Campaign Audience Match
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Target audience compatibility for active campaigns
    </p>

    <div className="space-y-5 mt-7">

      <div>

        <div className="flex justify-between">

          <div>

            <p className="font-semibold">

              Tech Product Launch

            </p>

            <p className="text-xs text-gray-500">

              Technology • 18–34

            </p>

          </div>

          <b className="text-green-600">

            94%

          </b>

        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-3">

          <div className="h-3 w-[94%] bg-green-500 rounded-full" />

        </div>

      </div>

      <div>

        <div className="flex justify-between">

          <div>

            <p className="font-semibold">

              Beauty Collection

            </p>

            <p className="text-xs text-gray-500">

              Lifestyle • 18–30

            </p>

          </div>

          <b className="text-blue-600">

            86%

          </b>

        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-3">

          <div className="h-3 w-[86%] bg-blue-600 rounded-full" />

        </div>

      </div>

      <div>

        <div className="flex justify-between">

          <div>

            <p className="font-semibold">

              Fitness Challenge

            </p>

            <p className="text-xs text-gray-500">

              Fitness • 25–44

            </p>

          </div>

          <b className="text-orange-600">

            72%

          </b>

        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-3">

          <div className="h-3 w-[72%] bg-orange-500 rounded-full" />

        </div>

      </div>

    </div>

  </div>


  {/* AUDIENCE OVERLAP */}

  <div className="bg-white rounded-2xl border shadow-sm p-6">

    <h2 className="text-xl font-bold">
      Audience Overlap Analysis
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Detect repeated audience targeting across campaigns
    </p>

    <div className="flex justify-center mt-7">

      <div className="w-40 h-40 rounded-full border-[15px] border-purple-600 flex flex-col items-center justify-center">

        <span className="text-4xl font-bold">

          28%

        </span>

        <span className="text-xs text-gray-500">

          Audience Overlap

        </span>

      </div>

    </div>

    <div className="mt-7 bg-amber-50 border border-amber-100 rounded-xl p-4">

      <p className="font-bold text-amber-800">

        Optimization Alert

      </p>

      <p className="text-sm text-amber-700 mt-2">

        Two active campaigns target a similar
        18–24 audience. Adjust targeting to
        reduce campaign competition.

      </p>

    </div>

  </div>

</div>


{/* ================================= */}
{/* AI AUDIENCE STRATEGY */}
{/* ================================= */}

<div className="rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-800 p-7 text-white">

  <p className="text-sm text-indigo-200">

    AI Audience Strategy

  </p>

  <h2 className="text-2xl font-bold mt-2">

    Recommended Audience Expansion
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

    <div className="bg-white/10 rounded-xl p-5">

      <p className="font-bold">

        Expand Hyderabad

      </p>

      <p className="text-sm text-indigo-100 mt-2">

        Audience growth is 21%, making it the
        strongest location expansion opportunity.

      </p>

    </div>

    <div className="bg-white/10 rounded-xl p-5">

      <p className="font-bold">

        Target 25–34 Users

      </p>

      <p className="text-sm text-indigo-100 mt-2">

        This segment shows strong engagement
        and high conversion potential.

      </p>

    </div>

    <div className="bg-white/10 rounded-xl p-5">

      <p className="font-bold">

        Post at 6–9 PM

      </p>

      <p className="text-sm text-indigo-100 mt-2">

        Audience activity is highest during
        evening hours.

      </p>

    </div>

  </div>

</div>
    </div>
  );
}

export default AudienceInsights;