import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiUpload } from "react-icons/fi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80"); // State for avatar image
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sessions = [
    { browser: "Chrome on iPhone", ip: "222.225.225.222", date: "Signed in Nov 17, 2023" },
    { browser: "Chrome on Macbook Pro", ip: "222.225.225.222", date: "Signed in Nov 17, 2023" },
    { browser: "Safari on Macbook Pro", ip: "222.225.225.222", date: "Signed in Nov 17, 2023" },
  ];

  const handleSaveChanges = () => {
    alert("Changes saved!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Set the uploaded image as the avatar
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <>
      {/* Added motion heading */}
      <div className="pb-4 px-4">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="my-32 text-center text-4xl"
        >
          SETTINGS
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row px-6 py-10 text-white gap-10">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-gray-900 rounded-xl p-4 shadow-lg">
          <ul className="space-y-3 text-white">
            {["editProfile", "password", "sessions"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === tab
                      ? "bg-white text-black font-semibold shadow"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {tab === "editProfile"
                    ? "Edit Profile"
                    : tab === "password"
                    ? "Password"
                    : "Your Sessions"}
                </button>
              </li>
            ))}
            <li className="pt-6 border-t border-gray-700">
              <button className="text-red-400 hover:text-red-500 px-4">Delete Account</button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="md:w-3/4">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold mb-6"
          >
            {activeTab === "editProfile"
              ? "Edit Profile"
              : activeTab === "password"
              ? "Change Password"
              : "Your Sessions"}
          </motion.div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
            {activeTab === "editProfile" && (
              <>
                <div className="flex items-center space-x-4">
                  <img
                    src={avatar} // Show the uploaded image as the avatar
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <label htmlFor="file-upload" className="flex items-center gap-2 text-sm bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
                    <FiUpload /> Upload new image
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden" // Hide the default file input
                    onChange={handleImageUpload} // Trigger the image upload handler
                    accept="image/*"
                  />
                </div>
                <p className="text-gray-400 text-sm">At least 800x800px. JPG, PNG or GIF.</p>

                <input
                  type="text"
                  placeholder="Username or email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />
                <div className="flex items-center gap-2">
                  <FiMapPin />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <textarea
                  placeholder="Short bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 h-24 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />

                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                >
                  Save changes
                </button>
              </>
            )}

            {activeTab === "password" && (
              <>
                <input
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />

                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                >
                  Change password
                </button>
              </>
            )}

            {activeTab === "sessions" && (
              <>
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-900 rounded border border-gray-700"
                  >
                    <div>
                      <p className="font-medium">{session.browser}</p>
                      <p className="text-sm text-gray-400">{session.ip}</p>
                      <p className="text-sm text-gray-400">{session.date}</p>
                    </div>
                    <button className="text-red-400 hover:underline">Revoke</button>
                  </div>
                ))}
                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                  Sign out all devices
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
