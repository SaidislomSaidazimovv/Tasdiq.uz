import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <style>{`
        .btn-hover {
          position: relative;
          overflow: hidden;
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-hover:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-hover span, .btn-hover svg {
          position: relative;
          z-index: 1;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <NavLink
              to="/dashboard/overview"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-blue-700"
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-blue-700"
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/dashboard/comments"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-blue-700"
                }`
              }
            >
              Comments
            </NavLink>
            <NavLink
              to="/dashboard/ratings"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-blue-700"
                }`
              }
            >
              Ratings
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with User Info and Logout */}
          <div className="bg-blue-600 py-5 px-7 flex justify-end items-center gap-3">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white rounded-xl border border-blue-600">
              <UserCircle className="w-6 h-6 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">
                  {username}
                </span>
                {userRole === "admin" && (
                  <span className="text-xs text-blue-600 font-semibold">
                    Administrator
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="btn-hover flex items-center space-x-2 px-6 py-2.5 border-2 border-red-500 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:border-red-600 transition-all duration-300 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-base">Logout</span>
            </button>
          </div>

          {/* Content Area */}
          <main className="flex-1 p-8 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <LogOut className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900">
                Logout qilmoqchimisiz?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Haqiqatan ham tizimdan chiqishni xohlaysizmi?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={cancelLogout}
                className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-300 font-bold text-base"
              >
                Yo'q
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-6 py-3.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl"
              >
                Ha, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;