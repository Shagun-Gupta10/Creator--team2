import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { ReportChart } from "./ReportChart";
import {
  FileText,
  Download,
  Users,
  ShieldCheck,
  TrendingUp,
  Database,
  FileSpreadsheet,
  Braces,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";


const reportData = [
  {
    id: "platform",
    title: "Platform Summary",
    description:
      "Users, activity, growth and overall platform performance.",
    icon: Database,
    color:
      "bg-blue-100 text-blue-700",
  },

  {
    id: "users",
    title: "User Management",
    description:
      "User accounts, roles, status and registration activity.",
    icon: Users,
    color:
      "bg-purple-100 text-purple-700",
  },

  {
    id: "security",
    title: "Security & Audit",
    description:
      "Security alerts, login activity and audit events.",
    icon: ShieldCheck,
    color:
      "bg-red-100 text-red-700",
  },

  {
    id: "growth",
    title: "Growth & Performance",
    description:
      "Platform reach, engagement and growth trends.",
    icon: TrendingUp,
    color:
      "bg-green-100 text-green-700",
  },
];


function AdminReports() {

  const [period, setPeriod] =
    useState("This Month");
  const [message, setMessage] =
    useState("");

  const [downloadHistory, setDownloadHistory] =
    useState([]);

const [selectedReport, setSelectedReport] = useState({
  id: null,
  title: "",
});

  const getSelectedReport = () => {
  return reportData.find(
    (report) => report.id === selectedReport.id
  ) || {
    title: "No report selected",
    description: "",
    date: ""
  };
};


  const downloadCSV = () => {

    const report =
      getSelectedReport();

    const csvContent =

`Report Type,${report.title}
Period,${period}
Total Users,12480
Active Users,11820
Security Score,87
Platform Growth,18%`;

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${report.id}-${period
        .replaceAll(" ", "-")
        .toLowerCase()}.csv`;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );

    setMessage(
      `${report.title} CSV report downloaded successfully.`
    );

    addToHistory(
      report.title,
      "CSV"
    );

  };


  const downloadJSON = () => {

    const report =
      getSelectedReport();

    const jsonData = {

      reportType:
        report.title,

      period:

        period,

      generatedAt:

        new Date()
          .toLocaleString(),

      statistics: {

        totalUsers:
          12480,

        activeUsers:
          11820,

        securityScore:
          87,

        platformGrowth:
          "18%",

      },

    };

    const blob = new Blob(

      [
        JSON.stringify(
          jsonData,
          null,
          2
        ),
      ],

      {
        type:
          "application/json",
      }

    );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${report.id}-${period
        .replaceAll(" ", "-")
        .toLowerCase()}.json`;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );

    setMessage(
      `${report.title} JSON report downloaded successfully.`
    );

    addToHistory(
      report.title,
      "JSON"
    );

  };


  const printReport = () => {

    window.print();

    const report =
      getSelectedReport();

    setMessage(
      `${report.title} report opened for printing.`
    );

    addToHistory(
      report.title,
      "Print"
    );

  };


  const addToHistory = (
    reportName,
    format
  ) => {

    setDownloadHistory(
      (currentHistory) => [

        {
          id:
            Date.now(),

          report:
            reportName,

          format:

            format,

          time:

            new Date()
              .toLocaleTimeString(),

        },

        ...currentHistory,

      ]
    );

  };
const reportData = [
  {
    category: "Total Users",
    value: "12,480",
    status: "Healthy",
  },
  {
    category: "Active Users",
    value: "11,820",
    status: "Excellent",
  },
  {
    category: "Platform Revenue",
    value: "₹8,45,000",
    status: "Growing",
  },
  {
    category: "Security Alerts",
    value: "7",
    status: "Needs Review",
  },
];


const downloadPDF = () => {

  const pdf = new jsPDF();

  pdf.setFontSize(20);

  pdf.text(
    "Admin Platform Report",
    14,
    20
  );

  pdf.setFontSize(11);

  pdf.text(
    "Generated from Analytics Dashboard",
    14,
    28
  );

  autoTable(
    pdf,
    {
      startY: 38,

      head: [
        [
          "Category",
          "Value",
          "Status",
        ],
      ],

      body:
        reportData.map(
          (item) => [

            item.category,

            item.value,

            item.status,

          ]
        ),
    }
  );

  pdf.save(
    "admin-platform-report.pdf"
  );

};


const downloadExcel = () => {

  const worksheet =

    XLSX.utils.json_to_sheet(
      reportData
    );


  const workbook =

    XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Admin Report"

  );


  XLSX.writeFile(

    workbook,

    "admin-platform-report.xlsx"

  );

};
  return (

    <div className="space-y-7">


      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <p className="text-blue-600 font-semibold">

            Platform Administration

          </p>

          <h1 className="text-3xl font-bold mt-1">

            Reports & Data Export

          </h1>

          <p className="text-gray-500 mt-2">

            Generate platform reports
            and export administrative data.

          </p>

        </div>


        <div className="flex items-center gap-3">

          <Calendar
            size={20}
            className="text-blue-600"
          />

          <select

            value={period}

            onChange={(event) =>
              setPeriod(
                event.target.value
              )
            }

            className="border rounded-xl px-4 py-3 bg-white"

          >

            <option>

              This Week

            </option>

            <option>

              This Month

            </option>

            <option>

              Last 3 Months

            </option>

            <option>

              This Year

            </option>

          </select>

        </div>

      </div>


      {/* SUCCESS MESSAGE */}

      {message && (

        <div className="flex items-center justify-between gap-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={21}
            />

            <p className="font-semibold">

              {message}

            </p>

          </div>

          <button

            type="button"

            onClick={() =>
              setMessage("")
            }

            className="font-bold text-xl"

          >

            ×

          </button>

        </div>

      )}


      {/* REPORT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {reportData.map(
          (report) => {

            const Icon =
              report.icon;

            const selected =
              selectedReport ===
              report.id;

            return (

              <button

                type="button"

                key={report.id}

                onClick={() =>
                  setSelectedReport(
                    report.id
                  )
                }

                className={
                  `text-left bg-white border rounded-2xl p-6 shadow-sm transition
                  ${
                    selected

                      ? "border-blue-600 ring-2 ring-blue-100"

                      : "hover:border-blue-300"
                  }`
                }

              >

                <div

                  className={
                    `w-12 h-12 rounded-xl flex items-center justify-center ${report.color}`
                  }

                >

                  <Icon
                    size={24}
                  />

                </div>

                <h2 className="font-bold text-lg mt-5">

                  {report.title}

                </h2>

                <p className="text-sm text-gray-500 mt-2">

                  {report.description}

                </p>

              </button>

            );

          }

        )}

      </div>


      {/* EXPORT SECTION */}

      <div className="bg-white border rounded-2xl p-7 shadow-sm">

        <div className="flex items-center gap-3">

          <FileText
            className="text-blue-600"
            size={26}
          />

          <div>

            <h2 className="text-xl font-bold">

              Export Selected Report

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Selected:

              {" "}

             <span className="font-semibold text-gray-700">

  {
    getSelectedReport()?.title
    || "No report selected"
  }

</span>

            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">


          {/* CSV */}

          <button

            type="button"

            onClick={
              downloadCSV
            }

            className="border rounded-2xl p-6 text-left hover:border-green-500 hover:bg-green-50 transition"

          >

            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

              <FileSpreadsheet
                size={24}
              />

            </div>

            <h3 className="font-bold text-lg mt-5">

              Download CSV

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Export report data
              for Excel or spreadsheets.

            </p>

          </button>


          {/* JSON */}

          <button

            type="button"

            onClick={
              downloadJSON
            }

            className="border rounded-2xl p-6 text-left hover:border-purple-500 hover:bg-purple-50 transition"

          >

            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">

              <Braces
                size={24}
              />

            </div>

            <h3 className="font-bold text-lg mt-5">

              Download JSON

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Export structured
              platform data for systems.

            </p>

          </button>
          <div className="flex flex-wrap gap-3">

  <button
    type="button"
    onClick={downloadPDF}
    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold"
  >

    <Download size={19} />

    Download PDF

  </button>


  <button
    type="button"
    onClick={downloadExcel}
    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
  >

    <Download size={19} />

    Download Excel

  </button>

</div>


          {/* PRINT */}

          <button

            type="button"

            onClick={
              printReport
            }

            className="border rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"

          >

            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

              <Printer
                size={24}
              />

            </div>

            <h3 className="font-bold text-lg mt-5">

              Print Report

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Open the report
              in the browser print window.

            </p>

          </button>

        </div>

      </div>


      {/* REPORT PREVIEW */}

      <div className="bg-slate-900 text-white rounded-2xl p-7">

        <div className="flex items-center gap-3">

          <TrendingUp
            size={25}
          />

          <div>

            <h2 className="text-xl font-bold">

              Report Preview

            </h2>
console.log("Report data:", report);
            <p className="text-slate-300 text-sm mt-1">
{
  getSelectedReport()?.title || "No report selected"
}
</p>
              

              {" · "}

              {period}

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">

          <div>

            <p className="text-slate-400 text-sm">

              Total Users

            </p>

            <p className="text-3xl font-bold mt-2">

              12,480

            </p>

          </div>

          <div>

            <p className="text-slate-400 text-sm">

              Active Users

            </p>

            <p className="text-3xl font-bold mt-2">

              11,820

            </p>

          </div>

          <div>

            <p className="text-slate-400 text-sm">

              Security Score

            </p>

            <p className="text-3xl font-bold mt-2">

              87/100

            </p>

          </div>

          <div>

            <p className="text-slate-400 text-sm">

              Platform Growth

            </p>

            <p className="text-3xl font-bold mt-2 text-green-400">

              +18%

            </p>

          </div>

        </div>

      </div>


      {/* DOWNLOAD HISTORY */}

      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <Clock
            className="text-blue-600"
            size={23}
          />

          <div>

            <h2 className="text-xl font-bold">

              Export History

            </h2>

            <p className="text-sm text-gray-500">

              Recent report downloads
              during this session.

            </p>

          </div>

        </div>


        {downloadHistory.length === 0

          ? (

            <p className="text-gray-400 text-center py-10">

              No reports downloaded yet.

            </p>

          )

          : (

            <div className="mt-6 space-y-3">

              {downloadHistory.map(
                (item) => (

                  <div

                    key={item.id}

                    className="flex items-center justify-between border rounded-xl p-4"

                  >

                    <div>

                      <p className="font-semibold">

                        {item.report}

                      </p>

                      <p className="text-sm text-gray-500">

                        {item.time}

                      </p>

                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">

                      {item.format}

                    </span>

                  </div>

                )

              )}

            </div>

          )

        }

      </div>

    </div>

  );

}


export default AdminReports;