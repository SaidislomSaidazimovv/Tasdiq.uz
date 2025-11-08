import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Overview from "./pages/Dashboard/Overview";
import Users from "./pages/Dashboard/Users";
import Comments from "./pages/Dashboard/Comments";
import Ratings from "./pages/Dashboard/Ratings";

// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// function AdminRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
//   const userRole = localStorage.getItem("userRole");

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (userRole !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// function UserRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
//   const userRole = localStorage.getItem("userRole");

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (userRole === "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}

        <Route
          path="/"
          element={
            // <UserRoute>
              <>
                <Header />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            // </UserRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            // <AdminRoute>
              <Dashboard />
            // </AdminRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="comments" element={<Comments />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>

        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;