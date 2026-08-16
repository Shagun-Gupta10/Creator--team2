import React, { useMemo, useState } from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Search,
  Filter,
  Eye,
  Pencil,
  Ban,
  ShieldCheck,
  Activity,
  AlertTriangle,
} from "lucide-react";


const usersData = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@gmail.com",
    role: "Creator",
    status: "Active",
    joined: "12 Jul 2026",
    lastLogin: "Today, 10:25 AM",
  },

  {
    id: 2,
    name: "Kavin Raj",
    email: "kavin@gmail.com",
    role: "Creator",
    status: "Active",
    joined: "08 Jul 2026",
    lastLogin: "Today, 09:40 AM",
  },

  {
    id: 3,
    name: "CreativeHub Agency",
    email: "creativehub@gmail.com",
    role: "Agency",
    status: "Active",
    joined: "02 Jul 2026",
    lastLogin: "Yesterday, 06:30 PM",
  },

  {
    id: 4,
    name: "Priya Marketing",
    email: "priya@marketing.com",
    role: "Marketing Team",
    status: "Active",
    joined: "28 Jun 2026",
    lastLogin: "Yesterday, 04:15 PM",
  },

  {
    id: 5,
    name: "Arun Kumar",
    email: "arun@gmail.com",
    role: "Creator",
    status: "Suspended",
    joined: "20 Jun 2026",
    lastLogin: "18 Jul 2026",
  },

  {
    id: 6,
    name: "System Admin",
    email: "admin@platform.com",
    role: "Administrator",
    status: "Active",
    joined: "01 Jan 2026",
    lastLogin: "Today, 11:10 AM",
  },
];


function UserManagement() {

const [search, setSearch] = useState("");

const [selectedRole, setSelectedRole] =
  useState("All");

const [selectedStatus, setSelectedStatus] =
  useState("All");

const [users, setUsers] =
  useState(usersData);

const [selectedUser, setSelectedUser] =
  useState(null);

const [editingUser, setEditingUser] =
  useState(null);

  const filteredUsers = useMemo(() => {

   return users.filter((user) => {
      const searchMatch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());


      const roleMatch =
        selectedRole === "All" ||
        user.role === selectedRole;


      const statusMatch =
        selectedStatus === "All" ||
        user.status === selectedStatus;
      const handleToggleUserStatus = (userId) => {

  setUsers((currentUsers) =>

    currentUsers.map((user) =>

      user.id === userId
        ? {
            ...user,
            status:
              user.status === "Active"
                ? "Suspended"
                : "Active",
          }
        : user

    )

  );

};

      return (
        searchMatch &&
        roleMatch &&
        statusMatch
      );

    });

  }, [
    users,
    search,
    selectedRole,
    selectedStatus,
  ]);

const handleSaveUser = () => {

  setUsers((currentUsers) =>
    currentUsers.map((user) =>

      user.id === editingUser.id
        ? editingUser
        : user

    )
  );
const handleToggleUserStatus = (userId) => {

  setUsers((currentUsers) =>

    currentUsers.map((user) =>

      user.id === userId
        ? {
            ...user,
            status:
              user.status === "Active"
                ? "Suspended"
                : "Active",
          }
        : user

    )

  );

};
  setEditingUser(null);

};
  const getRoleStyle = (role) => {

    if (role === "Creator") {
      return "bg-blue-100 text-blue-700";
    }

    if (role === "Agency") {
      return "bg-purple-100 text-purple-700";
    }

    if (role === "Marketing Team") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-slate-200 text-slate-700";

  };


  return (

    <div className="space-y-7">


      {/* HEADER */}

      <div>

        <p className="text-blue-600 font-semibold">

          Platform Administration

        </p>

        <h1 className="text-3xl font-bold mt-1">

          User Management

        </h1>

        <p className="text-gray-500 mt-2">

          Monitor users, manage roles,
          review account status and
          maintain platform security.

        </p>

      </div>



      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between">

            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

              <Users size={24} />

            </div>

            <span className="text-green-600 text-sm font-bold">

              +12%

            </span>

          </div>

          <p className="text-gray-500 mt-5">

            Total Users

          </p>

          <h2 className="text-3xl font-bold mt-1">

            12,480

          </h2>

          <p className="text-sm text-gray-400 mt-2">

            Across all platform roles

          </p>

        </div>



        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

            <UserCheck size={24} />

          </div>

          <p className="text-gray-500 mt-5">

            Active Users

          </p>

          <h2 className="text-3xl font-bold mt-1">

            11,820

          </h2>

          <p className="text-green-600 text-sm mt-2">

            94.7% active rate

          </p>

        </div>



        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">

            <UserPlus size={24} />

          </div>

          <p className="text-gray-500 mt-5">

            New Users

          </p>

          <h2 className="text-3xl font-bold mt-1">

            248

          </h2>

          <p className="text-purple-600 text-sm mt-2">

            Joined this month

          </p>

        </div>



        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">

            <UserX size={24} />

          </div>

          <p className="text-gray-500 mt-5">

            Suspended Accounts

          </p>

          <h2 className="text-3xl font-bold mt-1">

            34

          </h2>

          <p className="text-red-600 text-sm mt-2">

            Requires review

          </p>

        </div>


      </div>



      {/* SEARCH AND FILTER */}

      <div className="bg-white border rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">


          <div className="relative w-full xl:w-96">

            <Search
              size={19}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input

              type="text"

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="Search by name or email..."

              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>



          <div className="flex flex-col sm:flex-row gap-3">


            <select

              value={selectedRole}

              onChange={(e) =>
                setSelectedRole(e.target.value)
              }

              className="border rounded-xl px-4 py-3 bg-white"

            >

              <option value="All">

                All Roles

              </option>

              <option value="Creator">

                Creator

              </option>

              <option value="Agency">

                Agency

              </option>

              <option value="Marketing Team">

                Marketing Team

              </option>

              <option value="Administrator">

                Administrator

              </option>

            </select>



            <select

              value={selectedStatus}

              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }

              className="border rounded-xl px-4 py-3 bg-white"

            >

              <option value="All">

                All Status

              </option>

              <option value="Active">

                Active

              </option>

              <option value="Suspended">

                Suspended

              </option>

            </select>


          </div>


        </div>

      </div>



      {/* USER TABLE */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">


        <div className="p-6 border-b">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">

                Platform Users

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Showing {filteredUsers.length}
                {" "}matching users

              </p>

            </div>

            <Filter
              className="text-blue-600"
            />

          </div>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">


            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">

                  User

                </th>

                <th className="text-left p-4">

                  Role

                </th>

                <th className="text-left p-4">

                  Status

                </th>

                <th className="text-left p-4">

                  Joined

                </th>

                <th className="text-left p-4">

                  Last Login

                </th>

                <th className="text-left p-4">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>


              {filteredUsers.map((user) => (

                <tr

                  key={user.id}

                  className="border-t hover:bg-gray-50"

                >


                  <td className="p-4">

                    <div className="flex items-center gap-3">


                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">

                        {user.name[0]}

                      </div>


                      <div>

                        <p className="font-semibold">

                          {user.name}

                        </p>

                        <p className="text-sm text-gray-500">

                          {user.email}

                        </p>

                      </div>


                    </div>

                  </td>



                  <td className="p-4">

                    <span

                      className={`
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-semibold
                        ${getRoleStyle(user.role)}
                      `}

                    >

                      {user.role}

                    </span>

                  </td>



                  <td className="p-4">

                    <span

                      className={
                        user.status === "Active"

                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"

                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold"
                      }

                    >

                      {user.status}

                    </span>

                  </td>



                  <td className="p-4">

                    {user.joined}

                  </td>



                  <td className="p-4 text-gray-600">

                    {user.lastLogin}

                  </td>



                  <td className="p-4">

                    <div className="flex gap-2">


<button
  title="View User"
  onClick={() => setSelectedUser(user)}
  className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
>
  <Eye size={18} />
</button>
<button

  title="Edit User"

  onClick={() =>
    setEditingUser({ ...user })
  }

  className="p-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100"

>

  <Pencil size={18} />

</button>

<button
  type="button"
  onClick={() => {
    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        currentUser.id === user.id
          ? {
              ...currentUser,
              status:
                currentUser.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : currentUser
      )
    );
  }}
  title={
    user.status === "Active"
      ? "Suspend User"
      : "Activate User"
  }
  className={
    user.status === "Active"
      ? "p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
      : "p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100"
  }
>
  <Ban size={18} />
</button>


                    </div>

                  </td>


                </tr>

              ))}


            </tbody>

          </table>

        </div>

      </div>



      {/* SECURITY + ACTIVITY */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-green-600"
              size={25}
            />

            <div>

              <h2 className="text-xl font-bold">

                Platform Security

              </h2>

              <p className="text-sm text-gray-500">

                Account protection status

              </p>

            </div>

          </div>


          <div className="mt-6 space-y-4">


            <div className="flex justify-between">

              <span>

                Two-Factor Authentication

              </span>

              <span className="text-green-600 font-bold">

                82% Enabled

              </span>

            </div>


            <div className="flex justify-between">

              <span>

                Secure Accounts

              </span>

              <span className="text-green-600 font-bold">

                11,960

              </span>

            </div>


            <div className="flex justify-between">

              <span>

                Risky Login Attempts

              </span>

              <span className="text-orange-600 font-bold">

                7 Detected

              </span>

            </div>


          </div>

        </div>



        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Activity
              className="text-blue-600"
              size={25}
            />

            <div>

              <h2 className="text-xl font-bold">

                Recent Admin Activity

              </h2>

              <p className="text-sm text-gray-500">

                Latest platform actions

              </p>

            </div>

          </div>


          <div className="mt-6 space-y-5">


            <div>

              <p className="font-semibold">

                New agency account approved

              </p>

              <p className="text-sm text-gray-500">

                CreativeHub Agency · 20 minutes ago

              </p>

            </div>


            <div>

              <p className="font-semibold">

                User role updated

              </p>

              <p className="text-sm text-gray-500">

                Creator changed to Agency · 1 hour ago

              </p>

            </div>


            <div>

              <p className="font-semibold">

                Suspicious login reviewed

              </p>

              <p className="text-sm text-gray-500">

                Security verification completed

              </p>

            </div>


          </div>

        </div>


      </div>



      {/* AI ALERT */}

      <div className="border border-orange-200 bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-lg">

              AI Security Alert

            </h2>

            <p className="text-gray-600 mt-2">

              7 unusual login attempts were detected.
              Review account activity and enable
              two-factor authentication for
              high-risk accounts.

            </p>

          </div>

        </div>
      {/* AI ALERT */}

      <div>
        ...
      </div>

      </div>
{/* VIEW USER MODAL */}

{selectedUser && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-blue-600 font-semibold">
            User Profile
          </p>

          <h2 className="text-2xl font-bold mt-1">
            User Details
          </h2>

        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-400 hover:text-red-600 text-2xl"
        >
          ×
        </button>

      </div>


      <div className="flex items-center gap-4 mt-7">

        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">

          {selectedUser.name[0]}

        </div>

        <div>

          <h3 className="text-xl font-bold">

            {selectedUser.name}

          </h3>

          <p className="text-gray-500">

            {selectedUser.email}

          </p>

        </div>

      </div>


      <div className="grid grid-cols-2 gap-4 mt-7">

        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Role
          </p>

          <p className="font-bold mt-1">
            {selectedUser.role}
          </p>

        </div>


        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Account Status
          </p>

          <p className="font-bold mt-1">
            {selectedUser.status}
          </p>

        </div>


        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Joined
          </p>

          <p className="font-bold mt-1">
            {selectedUser.joined}
          </p>

        </div>


        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Last Login
          </p>

          <p className="font-bold mt-1">
            {selectedUser.lastLogin}
          </p>

        </div>

      </div>


      <button
        onClick={() => setSelectedUser(null)}
        className="w-full mt-7 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
      >
        Close
      </button>

    </div>

  </div>

)}
{/* EDIT USER MODAL */}

{editingUser && (

  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-7">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-purple-600 font-semibold">
            Administrator Controls
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Edit User
          </h2>

        </div>

        <button

          onClick={() =>
            setEditingUser(null)
          }

          className="text-2xl text-gray-500 hover:text-red-600"

        >

          ×

        </button>

      </div>


      <div className="space-y-5 mt-7">


        <div>

          <label className="text-sm font-semibold">

            Full Name

          </label>

          <input

            type="text"

            value={editingUser.name}

            onChange={(e) =>

              setEditingUser({

                ...editingUser,

                name: e.target.value,

              })

            }

            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"

          />

        </div>


        <div>

          <label className="text-sm font-semibold">

            Email Address

          </label>

          <input

            type="email"

            value={editingUser.email}

            onChange={(e) =>

              setEditingUser({

                ...editingUser,

                email: e.target.value,

              })

            }

            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"

          />

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


          <div>

            <label className="text-sm font-semibold">

              User Role

            </label>

            <select

              value={editingUser.role}

              onChange={(e) =>

                setEditingUser({

                  ...editingUser,

                  role: e.target.value,

                })

              }

              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 bg-white"

            >

              <option>
                Creator
              </option>

              <option>
                Agency
              </option>

              <option>
                Marketing Team
              </option>

              <option>
                Administrator
              </option>

            </select>

          </div>


          <div>

            <label className="text-sm font-semibold">

              Account Status

            </label>

            <select

              value={editingUser.status}

              onChange={(e) =>

                setEditingUser({

                  ...editingUser,

                  status: e.target.value,

                })

              }

              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 bg-white"

            >

              <option>
                Active
              </option>

              <option>
                Suspended
              </option>

            </select>

          </div>


        </div>


      </div>


      <div className="flex flex-col sm:flex-row gap-3 mt-8">


        <button

          onClick={() =>
            setEditingUser(null)
          }

          className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold"

        >

          Cancel

        </button>


        <button

          onClick={handleSaveUser}

          className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold"

        >

          Save Changes

        </button>


      </div>

    </div>

  </div>

)}

    </div>

  );

}


export default UserManagement;