import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

      setName(response.data.name || "");
      setPhone(response.data.phone || "");
      setBio(response.data.bio || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("bio", bio);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="text-white text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0b1324] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-12">My App</h1>

          <div className="space-y-8 text-3xl">
            <p className="cursor-pointer hover:text-blue-400">
              Dashboard
            </p>

            <p
  onClick={() => navigate("/admin-dashboard")}
  className="cursor-pointer hover:text-blue-400"
>
  Admin Panel
</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-2xl"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex justify-center items-center p-10">
        <div className="bg-[#374151] p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
          
          <h1 className="text-6xl font-bold text-center mb-10">
            Dashboard
          </h1>

          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
            />
          </div>

          {editing ? (
            <div className="space-y-6">

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfilePic(e.target.files[0])
                }
                className="text-sm"
              />

              <div>
                <p className="text-xl mb-2">Name</p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full p-4 rounded-xl bg-[#4b5563] text-white outline-none"
                />
              </div>

              <div>
                <p className="text-xl mb-2">Phone</p>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full p-4 rounded-xl bg-[#4b5563] text-white outline-none"
                />
              </div>

              <div>
                <p className="text-xl mb-2">Bio</p>

                <textarea
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  className="w-full p-4 rounded-xl bg-[#4b5563] text-white outline-none"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-xl text-2xl font-semibold"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-8">

              <div>
                <p className="text-gray-300 text-xl">Name</p>

                <h2 className="text-4xl font-bold">
                  {user.name}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 text-xl">Email</p>

                <h2 className="text-3xl">
                  {user.email}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 text-xl">Phone</p>

                <h2 className="text-3xl">
                  {user.phone}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 text-xl">Bio</p>

                <h2 className="text-2xl">
                  {user.bio}
                </h2>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-2xl font-semibold"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;