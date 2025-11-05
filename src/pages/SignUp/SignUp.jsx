import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Parollar bir xil emas!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = existingUsers.find(
      user => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError("Bu username yoki email allaqachon ro'yxatdan o'tgan!");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user",
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("Ro'yxatdan muvaffaqiyatli o'tdingiz! Login sahifasiga yo'naltirilmoqda...");
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Ro'yxatdan O'tish
        </h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kamida 6 ta belgi"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Parolni Tasdiqlash</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Parolni qayta kiriting"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Ro'yxatdan O'tish
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Allaqachon akkountingiz bormi?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login qiling
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;