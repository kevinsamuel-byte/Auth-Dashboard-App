import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [user, setUser] =
    useState(null);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [profilePic, setProfilePic] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const token =
    localStorage.getItem("token");


  // FETCH USER
  const fetchUser = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.user) {
        console.log("No user found");
        return;
      }

      setUser(res.data.user);

      setName(
        res.data.user.name || ""
      );

      setPhone(
        res.data.user.phone || ""
      );

      setBio(
        res.data.user.bio || ""
      );

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {
    fetchUser();
  }, []);


  // UPDATE PROFILE
  const handleUpdate = async () => {
    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("bio", bio);

      if (profilePic) {
        formData.append(
          "profilePic",
          profilePic
        );
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setUser(res.data.user);

      setEditing(false);

      alert("Profile updated");

    } catch (err) {

      console.log(err);

    }
  };


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };


  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-black/30 border-r border-white/10 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-bold mb-12">
            My App
          </h1>

          <div className="space-y-6">

            <button
              className="block text-lg hover:text-blue-400"
            >
              Dashboard
            </button>

            {
              user.role === "admin" && (
                <button
                  onClick={() =>
                    window.location.href =
                      "/admin-dashboard"
                  }
                  className="block text-lg hover:text-blue-400"
                >
                  Admin Panel
                </button>
              )
            }

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition py-3 rounded-xl text-lg font-semibold"
        >
          Logout
        </button>

      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 flex justify-center items-center p-10">

        <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-center mb-10">
            Dashboard
          </h1>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-8 gap-4">

            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://dummyimage.com/150x150/000/fff"
              }
              alt="profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-white"
            />

            {
              editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfilePic(
                      e.target.files[0]
                    )
                  }
                  className="text-sm"
                />
              )
            }

          </div>

          {/* DETAILS */}
          <div className="space-y-6">

            {/* NAME */}
            <div>

              <p className="text-gray-400 mb-2">
                Name
              </p>

              {
                editing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />
                ) : (
                  <p className="text-2xl font-semibold">
                    {user.name}
                  </p>
                )
              }

            </div>


            {/* EMAIL */}
            <div>

              <p className="text-gray-400 mb-2">
                Email
              </p>

              <p className="text-xl">
                {user.email}
              </p>

            </div>


            {/* PHONE */}
            <div>

              <p className="text-gray-400 mb-2">
                Phone
              </p>

              {
                editing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />
                ) : (
                  <p className="text-xl">
                    {user.phone || "N/A"}
                  </p>
                )
              }

            </div>


            {/* BIO */}
            <div>

              <p className="text-gray-400 mb-2">
                Bio
              </p>

              {
                editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) =>
                      setBio(e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />
                ) : (
                  <p className="text-lg text-gray-300">
                    {user.bio || "No bio added"}
                  </p>
                )
              }

            </div>

          </div>


          {/* BUTTONS */}
          <div className="mt-10">

            {
              editing ? (
                <button
                  onClick={handleUpdate}
                  className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl text-lg font-semibold"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() =>
                    setEditing(true)
                  }
                  className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl text-lg font-semibold"
                >
                  Edit Profile
                </button>
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;