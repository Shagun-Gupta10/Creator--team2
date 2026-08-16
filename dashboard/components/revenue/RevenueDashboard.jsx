import RevenueCards from "./RevenueCards";
import RevenueTrendChart from "./RevenueTrendChart";
import RevenueSourceChart from "./RevenueSourceChart";
import PlatformRevenueChart from "./PlatformRevenueChart";
import VideoRevenueTable from "./VideoRevenueTable";
import SponsorshipAnalytics from "./SponsorshipAnalytics";
import SubscriptionAnalytics from "./SubscriptionAnalytics";
import AffiliateAnalytics from "./AffiliateAnalytics";
import RevenuePrediction from "./RevenuePrediction";
import FinancialInsights from "./FinancialInsights";
import RevenueGoalTracker from "./RevenueGoalTracker";
import RevenueAlerts from "./RevenueAlerts";
import DownloadReports from "./DownloadReports";
const RevenueDashboard = () => {
  const userRole = localStorage.getItem("userRole") || "Creator";
  const renderRevenueContent = () => {

  // CREATOR REVENUE
  if (userRole === "Creator") {
    return (
      <>
        <RevenueCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueTrendChart />
          <RevenueSourceChart />
        </div>

        <PlatformRevenueChart />

        <VideoRevenueTable />

        <SponsorshipAnalytics />

        <SubscriptionAnalytics />

        <AffiliateAnalytics />

        <RevenuePrediction />

        <FinancialInsights />

        <RevenueGoalTracker />

        <RevenueAlerts />

        <DownloadReports />
      </>
    );
  }


  // AGENCY REVENUE
  if (userRole === "Agency") {
    return (
      <>
        <RevenueCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueTrendChart />
          <RevenueSourceChart />
        </div>

        <PlatformRevenueChart />

        <SponsorshipAnalytics />

        <FinancialInsights />

        <RevenueGoalTracker />

        <RevenueAlerts />

        <DownloadReports />
      </>
    );
  }


  // MARKETING TEAM REVENUE
  if (userRole === "Marketing Team") {
    return (
      <>
        <RevenueCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueTrendChart />
          <RevenueSourceChart />
        </div>

        <PlatformRevenueChart />

        <FinancialInsights />

        <RevenueAlerts />

        <DownloadReports />
      </>
    );
  }


  // ADMINISTRATOR REVENUE
  if (userRole === "Administrator") {
    return (
      <>
        <RevenueCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueTrendChart />
          <RevenueSourceChart />
        </div>

        <PlatformRevenueChart />

        <FinancialInsights />

        <RevenueAlerts />

        <DownloadReports />
      </>
    );
  }

};

const dashboardTitle =
  userRole === "Agency"
    ? "Agency Revenue Analytics"
    : userRole === "Marketing Team"
    ? "Marketing Revenue Analytics"
    : userRole === "Administrator"
    ? "Platform Revenue Analytics"
    : "Revenue Analytics";

const dashboardSubtitle =
  userRole === "Agency"
    ? "Monitor agency earnings, creator commissions, campaign revenue and financial growth."
    : userRole === "Marketing Team"
    ? "Track campaign spending, marketing revenue and return on investment."
    : userRole === "Administrator"
    ? "Monitor platform-wide revenue, financial performance and revenue activity."
    : "Monitor earnings, sponsorships, subscriptions and AI revenue predictions.";
  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold">
  {dashboardTitle}
</h1>

<p className="text-gray-500 mt-2">
  {dashboardSubtitle}
</p>
      </div>
{renderRevenueContent()}

    </div>
  );
};

export default RevenueDashboard;