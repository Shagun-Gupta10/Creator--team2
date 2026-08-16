import {
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";

const sponsorshipStats = [
  {
    title: "Active Sponsors",
    value: 12,
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Completed Deals",
    value: 38,
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    title: "Pending Deals",
    value: 5,
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    title: "Sponsorship Income",
    value: "$48,500",
    icon: DollarSign,
    color: "bg-purple-500",
  },
];

const sponsorshipData = [
  {
    brand: "Nike",
    amount: "$3,500",
    status: "Paid",
    campaign: "Fitness Campaign",
  },
  {
    brand: "Amazon",
    amount: "$2,800",
    status: "Pending",
    campaign: "Prime Day",
  },
  {
    brand: "Adobe",
    amount: "$5,200",
    status: "Paid",
    campaign: "Creative Cloud",
  },
  {
    brand: "Samsung",
    amount: "$4,100",
    status: "Upcoming",
    campaign: "Galaxy Launch",
  },
  {
    brand: "Boat",
    amount: "$1,900",
    status: "Paid",
    campaign: "Audio Promotion",
  },
];

const SponsorshipAnalytics = () => {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">
          Sponsorship Analytics
        </h2>

        <p className="text-gray-500">
          Track sponsorship deals and brand collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {sponsorshipStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
                >
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="text-xl font-bold mb-5">
          Brand Sponsorships
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Brand</th>

                <th>Campaign</th>

                <th>Amount</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {sponsorshipData.map((brand, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4 font-semibold">
                    {brand.brand}
                  </td>

                  <td className="text-center">
                    {brand.campaign}
                  </td>

                  <td className="text-center font-bold text-green-600">
                    {brand.amount}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        brand.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : brand.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {brand.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default SponsorshipAnalytics;