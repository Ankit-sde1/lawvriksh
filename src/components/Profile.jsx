import React, { useRef } from "react";

const Profile = ({ profilePic, setProfilePic }) => {
  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setProfilePic(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-2xl shadow-md text-center">
      <div
        className="mb-4 flex justify-center cursor-pointer"
        onClick={() => fileInput.current.click()}
        title="Click to update"
      >
        {profilePic.startsWith("data") ? (
          <img
            src={profilePic}
            className="w-24 h-24 rounded-full object-cover"
            alt="profile"
          />
        ) : (
          <div className="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center text-3xl font-extrabold text-yellow-700">
            {profilePic}
          </div>
        )}
        <input
          type="file"
          ref={fileInput}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="font-bold text-lg mb-1">Robert Fox</div>
      <div className="text-slate-500 text-sm mb-2">82.1K Followers</div>
      <div className="text-xs text-gray-500 mb-4">
        His Bio [ Author | Writer | Poet ]<br />
        Entrepreneur | Developer
      </div>
      <button
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
  type="button"
>
  Follow
</button>
    </div>
  );
};

export default Profile;
