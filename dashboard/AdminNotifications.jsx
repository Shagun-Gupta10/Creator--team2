import React, { useMemo, useState } from "react";

import {
  Bell,
  ShieldAlert,
  UserPlus,
  Server,
  Activity,
  CheckCheck,
  Trash2,
  Filter,
  AlertTriangle,
  Clock,
} from "lucide-react";


const initialNotifications = [

  {
    id: 1,

    title:
      "Suspicious login detected",

    message:
      "A login attempt was detected from an unfamiliar device.",

    category:
      "Security",

    time:
      "5 minutes ago",

    unread:
      true,

    icon:
      "security",
  },


  {
    id: 2,

    title:
      "New creator registered",

    message:
      "A new creator account is waiting for verification.",

    category:
      "Users",

    time:
      "20 minutes ago",

    unread:
      true,

    icon:
      "user",
  },


  {
    id: 3,

    title:
      "System backup completed",

    message:
      "The scheduled platform database backup completed successfully.",

    category:
      "System",

    time:
      "1 hour ago",

    unread:
      false,

    icon:
      "system",
  },


  {
    id: 4,

    title:
      "High platform activity",

    message:
      "Platform traffic increased by 28% compared with yesterday.",

    category:
      "Activity",

    time:
      "2 hours ago",

    unread:
      true,

    icon:
      "activity",
  },


  {
    id: 5,

    title:
      "Security scan completed",

    message:
      "No critical security vulnerabilities were found.",

    category:
      "Security",

    time:
      "4 hours ago",

    unread:
      false,

    icon:
      "security",
  },


  {
    id: 6,

    title:
      "New agency request",

    message:
      "CreativeHub submitted an agency account request.",

    category:
      "Users",

    time:
      "Yesterday",

    unread:
      true,

    icon:
      "user",
  },

];


function AdminNotifications() {


  const [
    notifications,
    setNotifications,
  ] = useState(
    initialNotifications
  );


  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState(
    "All"
  );


  const filteredNotifications =
    useMemo(() => {

      return notifications.filter(
        (notification) => {

          if (
            selectedFilter ===
            "All"
          ) {

            return true;

          }


          if (
            selectedFilter ===
            "Unread"
          ) {

            return (
              notification.unread
            );

          }


          return (
            notification.category ===
            selectedFilter
          );

        }
      );

    }, [
      notifications,
      selectedFilter,
    ]);


  const unreadCount =

    notifications.filter(
      (notification) =>
        notification.unread
    ).length;


  const markAsRead = (
    id
  ) => {

    setNotifications(
      (currentNotifications) =>

        currentNotifications.map(
          (notification) =>

            notification.id === id

              ? {
                  ...notification,

                  unread:
                    false,
                }

              : notification

        )

    );

  };


  const markAllAsRead = () => {

    setNotifications(
      (currentNotifications) =>

        currentNotifications.map(
          (notification) => ({

            ...notification,

            unread:
              false,

          }))

    );

  };


  const deleteNotification = (
    id
  ) => {

    setNotifications(
      (currentNotifications) =>

        currentNotifications.filter(
          (notification) =>

            notification.id !== id

        )

    );

  };


  const getNotificationIcon = (
    type
  ) => {


    if (
      type ===
      "security"
    ) {

      return (

        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">

          <ShieldAlert
            size={23}
          />

        </div>

      );

    }


    if (
      type ===
      "user"
    ) {

      return (

        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

          <UserPlus
            size={23}
          />

        </div>

      );

    }


    if (
      type ===
      "system"
    ) {

      return (

        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">

          <Server
            size={23}
          />

        </div>

      );

    }


    return (

      <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

        <Activity
          size={23}
        />

      </div>

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

            Notification Center

          </h1>

          <p className="text-gray-500 mt-2">

            Monitor security alerts,
            user activity and
            platform updates.

          </p>

        </div>


        <button

          type="button"

          onClick={
            markAllAsRead
          }

          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-semibold"

        >

          <CheckCheck
            size={20}
          />

          Mark All as Read

        </button>


      </div>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

            <Bell
              size={24}
            />

          </div>

          <p className="text-gray-500 mt-5">

            Total Notifications

          </p>

          <h2 className="text-3xl font-bold mt-1">

            {
              notifications.length
            }

          </h2>

        </div>


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">

            <AlertTriangle
              size={24}
            />

          </div>

          <p className="text-gray-500 mt-5">

            Unread Alerts

          </p>

          <h2 className="text-3xl font-bold mt-1">

            {
              unreadCount
            }

          </h2>

        </div>


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">

            <ShieldAlert
              size={24}
            />

          </div>

          <p className="text-gray-500 mt-5">

            Security Alerts

          </p>

          <h2 className="text-3xl font-bold mt-1">

            {
              notifications.filter(
                (notification) =>

                  notification.category ===
                  "Security"

              ).length
            }

          </h2>

        </div>


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

            <UserPlus
              size={24}
            />

          </div>

          <p className="text-gray-500 mt-5">

            User Updates

          </p>

          <h2 className="text-3xl font-bold mt-1">

            {
              notifications.filter(
                (notification) =>

                  notification.category ===
                  "Users"

              ).length
            }

          </h2>

        </div>


      </div>


      {/* FILTER */}

      <div className="bg-white border rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">


          <div className="flex items-center gap-2">

            <Filter
              size={20}
              className="text-blue-600"
            />

            <p className="font-semibold">

              Filter Notifications

            </p>

          </div>


          <div className="flex flex-wrap gap-2">


            {[
              "All",
              "Unread",
              "Security",
              "Users",
              "System",
              "Activity",
            ].map(
              (filter) => (

                <button

                  type="button"

                  key={filter}

                  onClick={() =>

                    setSelectedFilter(
                      filter
                    )

                  }

                  className={
                    selectedFilter ===
                    filter

                      ? "bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"

                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-xl font-semibold"
                  }

                >

                  {filter}

                </button>

              )

            )}


          </div>

        </div>

      </div>


      {/* NOTIFICATION LIST */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">


        <div className="p-6 border-b">

          <h2 className="text-xl font-bold">

            Recent Notifications

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            Showing

            {" "}

            {
              filteredNotifications.length
            }

            {" "}

            notifications

          </p>

        </div>


        <div className="divide-y">


          {
            filteredNotifications.length ===
            0

              ? (

                <div className="py-14 text-center">

                  <Bell
                    size={38}
                    className="mx-auto text-gray-300"
                  />

                  <p className="font-semibold mt-4">

                    No notifications found

                  </p>

                  <p className="text-sm text-gray-500 mt-1">

                    Try selecting another filter.

                  </p>

                </div>

              )

              : (

                filteredNotifications.map(
                  (notification) => (

                    <div

                      key={
                        notification.id
                      }

                      className={
                        `p-6 flex flex-col md:flex-row md:items-center gap-5 transition
                        ${
                          notification.unread

                            ? "bg-blue-50/60"

                            : "bg-white"
                        }`
                      }

                    >


                      {
                        getNotificationIcon(
                          notification.icon
                        )
                      }


                      <div className="flex-1">


                        <div className="flex flex-wrap items-center gap-3">


                          <h3 className="font-bold">

                            {
                              notification.title
                            }

                          </h3>


                          {
                            notification.unread && (

                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600">

                              </span>

                            )
                          }


                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">

                            {
                              notification.category
                            }

                          </span>


                        </div>


                        <p className="text-gray-500 mt-2">

                          {
                            notification.message
                          }

                        </p>


                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">

                          <Clock
                            size={15}
                          />

                          {
                            notification.time
                          }

                        </div>


                      </div>


                      <div className="flex gap-2">


                        {
                          notification.unread && (

                            <button

                              type="button"

                              onClick={() =>

                                markAsRead(
                                  notification.id
                                )

                              }

                              className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"

                            >

                              Mark Read

                            </button>

                          )
                        }


                        <button

                          type="button"

                          onClick={() =>

                            deleteNotification(
                              notification.id
                            )

                          }

                          className="p-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100"

                          title="Delete Notification"

                        >

                          <Trash2
                            size={18}
                          />

                        </button>


                      </div>


                    </div>

                  )

                )

              )

          }


        </div>

      </div>


    </div>

  );

}


export default AdminNotifications;