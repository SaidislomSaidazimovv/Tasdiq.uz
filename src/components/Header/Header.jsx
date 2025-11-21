import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import Logo from "../../assets/tasdiq_logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const menuItems = [
    { name: "Qanday ishlaydi" },
    { name: "Afzalliklar" },
    { name: "Narxlar" },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }

        .menu-item {
          opacity: 0;
          animation: fadeInDown 0.5s ease-out forwards;
        }

        .menu-item:nth-child(1) { animation-delay: 0.1s; }
        .menu-item:nth-child(2) { animation-delay: 0.2s; }
        .menu-item:nth-child(3) { animation-delay: 0.3s; }

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

        .logo-animate {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .logo-animate:hover {
          // transform: scale(1.05);
          filter: brightness(1.1);
        }

        .nav-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-button:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <header
        className={`fixed left-1/2 -translate-x-1/2 w-[88%] max-w-5xl z-50 transition-all duration-700 ease-in-out ${
          scrolled ? "bg-white shadow-2xl top-4" : "bg-white shadow-lg top-6"
        } rounded-full backdrop-blur-lg bg-opacity-95 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-8">
          <div className="flex items-center animate-slide-in-left">
            <a href="/" className="flex items-center logo-animate">
              <img
                src={Logo}
                alt="Header Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group menu-item">
                <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-5 relative group nav-button">
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3 animate-slide-in-right">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-transparent rounded-full border border-blue-100">
                  <UserCircle className="w-5 h-5 text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">
                      {username}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogoutClick}
                  className="btn-hover flex items-center space-x-2 px-5 py-2 border-2 border-red-500 bg-red-500 text-white rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 font-semibold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button className="btn-hover px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-xl transform hover:scale-105">
                <span>Boshlash</span>
              </button>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 animate-fade-in-down rounded-b-full overflow-hidden">
            <nav className="py-4 space-y-2 px-4">
              {menuItems.map((item, index) => (
                <div key={index} className="menu-item">
                  <button className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-lg transition-all duration-300">
                    <span className="font-semibold text-sm">{item.name}</span>
                  </button>
                </div>
              ))}

              {isLoggedIn && (
                <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
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

                  {userRole === "admin" && (
                    <a
                      href="/dashboard"
                      className="block w-full px-4 py-3 border-2 border-green-500 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold text-center text-sm"
                    >
                      Dashboard
                    </a>
                  )}

                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-red-500 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold text-sm"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

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
};

export default Header;
