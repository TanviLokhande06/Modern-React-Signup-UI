import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import User from "./components/User";

const App = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Name cannot be empty");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    const emailExists = users.some((user) => user.email === trimmedEmail);

    if (emailExists) {
      setError("Email already registered");
      return;
    }

    if (password.length < 8) {
      setError("Password must be 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must be same");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain a special character");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain a capital letter");
      return;
    }

    setUsers((prevData) => [
      ...prevData,
      {
        fullName: trimmedName,
        email: trimmedEmail,
      },
    ]);

    setError("");

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    toast.success("Account created successfully!", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create an Account
          </h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChanges}
              required
              type="text"
              placeholder="Enter Name here"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChanges}
              required
              type="email"
              placeholder="Enter Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="password"
              value={formData.password}
              onChange={handleChanges}
              required
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChanges}
              required
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {error && (
              <p className="text-red-500 font-medium text-sm text-center">
                {error}
              </p>
            )}

            <button
              disabled={
                !formData.fullName ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword
              }
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition duration-200"
            >
              Submit
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            By registering, you agree to our{" "}
            <span className="text-indigo-600 cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-indigo-600 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        <ToastContainer />
      </div>

      {users.map((elem) => {
        return <User key={elem.email} elem={elem} />;
      })}
    </>
  );
};

export default App;