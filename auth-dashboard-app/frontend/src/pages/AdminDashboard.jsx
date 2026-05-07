import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [users, setUsers] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  const [analytics, setAnalytics] =
    useState({
      totalUsers: 0,
      totalAdmins: 0,
      normalUsers: 0,
    });

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const token =
    localStorage.getItem("token");


  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/all-users?page=${page}&search=${search}&role=${roleFilter}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.users);

      setTotalPages(
        res.data.totalPages
      );

    } catch (err) {

      console.log(err);

      alert("Access denied");

    }
  };


  // FETCH ANALYTICS
  const fetchAnalytics = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/analytics`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setAnalytics(res.data);

    } catch (err) {

      console.log(err);

    }
  };


  // FETCH LOGS
  const fetchLogs = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/activity-logs`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setLogs(res.data);

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {

    fetchUsers();

  }, [
    page,
    search,
    roleFilter,
  ]);


  useEffect(() => {

    fetchAnalytics();
    fetchLogs();

  }, []);


  // DELETE USER
  const deleteUser = async (id) => {
    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
      fetchAnalytics();
      fetchLogs();

    } catch (err) {

      console.log(err);

    }
  };


  // CHANGE ROLE
  const changeRole = async (
    id,
    role
  ) => {
    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/role/${id}`,
        {
          role,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
      fetchAnalytics();
      fetchLogs();

    } catch (err) {

      console.log(err);

    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-10">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>


      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* TOTAL USERS */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 text-lg">
            Total Users
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {analytics.totalUsers}
          </h2>

        </div>

        {/* ADMINS */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 text-lg">
            Total Admins
          </p>

          <h2 className="text-5xl font-bold mt-4 text-blue-400">
            {analytics.totalAdmins}
          </h2>

        </div>

        {/* USERS */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 text-lg">
            Normal Users
          </p>

          <h2 className="text-5xl font-bold mt-4 text-green-400">
            {analytics.normalUsers}
          </h2>

        </div>

      </div>


      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {

            setSearch(
              e.target.value
            );

            setPage(1);

          }}
          className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        {/* FILTER */}
        <select
          value={roleFilter}
          onChange={(e) => {

            setRoleFilter(
              e.target.value
            );

            setPage(1);

          }}
          className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        >
          <option value="all">
            All Roles
          </option>

          <option value="admin">
            Admins
          </option>

          <option value="user">
            Users
          </option>

        </select>

      </div>


      {/* USERS */}
      <div className="space-y-6 mb-16">

        {
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white/10 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6"
            >

              {/* USER INFO */}
              <div className="flex items-center gap-6">

                <img
                  src={
                    user.profilePic
                      ? user.profilePic
                      : "https://dummyimage.com/100x100/000/fff"
                  }
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white"
                />

                <div>

                  <h2 className="text-3xl font-bold">
                    {user.name}
                  </h2>

                  <p className="text-gray-400 text-lg mt-1">
                    {user.email}
                  </p>

                  <p className="capitalize mt-2 text-lg">

                    Role:

                    <span
                      className={`ml-2 font-semibold ${
                        user.role === "admin"
                          ? "text-blue-400"
                          : "text-green-400"
                      }`}
                    >
                      {user.role}
                    </span>

                  </p>

                </div>

              </div>


              {/* ACTIONS */}
              <div className="flex gap-4">

                {/* CHANGE ROLE */}
                <button
                  onClick={() =>
                    changeRole(
                      user._id,
                      user.role === "admin"
                        ? "user"
                        : "admin"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 transition px-5 py-3 rounded-xl font-semibold"
                >
                  Change Role
                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteUser(user._id)
                  }
                  className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>


      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mb-16">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="bg-white/10 px-5 py-3 rounded-xl disabled:opacity-40"
        >
          Prev
        </button>

        <p className="text-lg">

          Page {page} of {totalPages}

        </p>

        {/* NEXT */}
        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-white/10 px-5 py-3 rounded-xl disabled:opacity-40"
        >
          Next
        </button>

      </div>


      {/* ACTIVITY LOGS */}
      <div>

        <h2 className="text-4xl font-bold mb-8">
          Activity Logs
        </h2>

        <div className="space-y-4">

          {
            logs.map((log) => (
              <div
                key={log._id}
                className="bg-white/10 border border-white/10 rounded-2xl p-5"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-3">

                  <div>

                    <p className="text-xl font-semibold">
                      {log.action}
                    </p>

                    <p className="text-gray-400 mt-2">
                      {log.details}
                    </p>

                  </div>

                  <div className="text-gray-500 text-sm">

                    {
                      new Date(
                        log.createdAt
                      ).toLocaleString()
                    }

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;