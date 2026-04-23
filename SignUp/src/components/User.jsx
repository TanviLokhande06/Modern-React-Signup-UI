import React from "react";

const User = ({ elem }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-md border border-gray-200 hover:shadow-xl transition duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
            {elem.fullName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {elem.fullName}
            </h3>
            <p className="text-sm text-gray-500">{elem.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
