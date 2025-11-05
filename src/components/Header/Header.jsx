import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShoppingCart,
  Rocket,
  Car,
  Globe,
  Users,
  Code,
  Building,
  LogOut,
  UserCircle,
} from "lucide-react";
import Container from "../Layout/Container";
import Logo from "../../assets/tasdiq_logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const dropdownContent = {
    Solutions: [
      {
        icon: <ShoppingCart className="w-5 h-5" />,
        title: "Marketplaces",
        description:
          "Streamline transactions, minimise risks, and maximise profits with an integrated solution.",
      },
      {
        icon: <ShoppingCart className="w-5 h-5" />,
        title: "eCommerce",
        description:
          "Embed secure payments instantly using easy-to-integrate, pre-built plugins.",
      },
      {
        icon: <Rocket className="w-5 h-5" />,
        title: "Startups",
        description:
          "Achieve profitable transactions from day one with Trustap's zero-risk, zero-upfront investment model.",
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: "Individual Transactions",
        description:
          "Ensure secure, risk-free transactions for purchases of any value.",
      },
      {
        icon: <Car className="w-5 h-5" />,
        title: "Motors",
        description:
          "Secure vehicle transactions with protected payments, fraud prevention, and accurate lead tracking.",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Domains",
        description:
          "Trustap is an ideal solution for secure transactions involving Domain Names and Digital Assets.",
      },
    ],
    Partners: [
      {
        icon: <Users className="w-5 h-5" />,
        title: "Partner Program",
        description: "Join our partner network and grow together.",
      },
      {
        icon: <Building className="w-5 h-5" />,
        title: "Enterprise",
        description: "Custom solutions for large organizations.",
      },
    ],
    Developers: [
      {
        icon: <Code className="w-5 h-5" />,
        title: "API Documentation",
        description: "Complete API reference and guides.",
      },
      {
        icon: <Code className="w-5 h-5" />,
        title: "Developer Tools",
        description: "SDKs, libraries, and testing tools.",
      },
    ],
    Company: [
      {
        icon: <Building className="w-5 h-5" />,
        title: "About Us",
        description: "Learn more about our mission and team.",
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: "Careers",
        description: "Join our growing team.",
      },
    ],
  };

  const menuItems = [
    { name: "Solutions", hasDropdown: true },
    { name: "Partners", hasDropdown: true },
    { name: "Developers", hasDropdown: true },
    { name: "Company", hasDropdown: true },
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
        .menu-item:nth-child(4) { animation-delay: 0.4s; }

        .dropdown-item {
          opacity: 0;
          animation: scaleIn 0.3s ease-out forwards;
        }

        .dropdown-item:nth-child(1) { animation-delay: 0.05s; }
        .dropdown-item:nth-child(2) { animation-delay: 0.1s; }
        .dropdown-item:nth-child(3) { animation-delay: 0.15s; }
        .dropdown-item:nth-child(4) { animation-delay: 0.2s; }
        .dropdown-item:nth-child(5) { animation-delay: 0.25s; }
        .dropdown-item:nth-child(6) { animation-delay: 0.3s; }

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

        .arrow-animate {
          transition: transform 0.3s ease;
        }

        .btn-hover:hover .arrow-animate {
          transform: translateX(5px);
        }

        .logo-animate {
          transition: transform 0.3s ease;
        }

        .dropdown-link:hover .dropdown-icon {
          transform: scale(1.1);
        }

        .dropdown-link:hover .dropdown-title {
          color: #2563eb;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white shadow-lg" : "bg-white"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-25">
            <div className="flex items-center animate-slide-in-left">
              <a href="/" className="flex items-center logo-animate">
                <img
                  src={Logo}
                  alt="Header Logo"
                  className="h-13 w-auto object-contain"
                />
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group menu-item"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-lg text-gray-800 hover:text-blue-600 transition-all duration-300 font-semibold py-2 relative group">
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {item.hasDropdown && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="p-6 grid grid-cols-2 gap-4">
                        {dropdownContent[item.name]?.map((dropItem, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="dropdown-item dropdown-link flex items-start space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 transform hover:scale-105"
                          >
                            <div className="dropdown-icon flex-shrink-0 text-blue-600 mt-1 transform transition-transform duration-300">
                              {dropItem.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="dropdown-title font-semibold text-gray-900 mb-1 transition-colors">
                                {dropItem.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {dropItem.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4 animate-slide-in-right">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
                    <UserCircle className="w-6 h-6 text-blue-600" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">
                        {username}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogoutClick}
                    className="btn-hover flex items-center space-x-2 px-6 py-2.5 border-2 border-red-500 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:border-red-600 transition-all duration-300 font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-base">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-hover flex items-center space-x-2 px-7 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold transform">
                    <span className="text-lg">Transact Now</span>
                    <ArrowRight className="w-5 h-5 arrow-animate" />
                  </button>
                  <button className="btn-hover flex items-center space-x-2 px-7 py-3 border-2 border-blue-600 bg-blue-600 text-white rounded-xl hover:bg-white hover:text-blue-600 hover:border-blue-700 transition-all duration-300 font-semibold transform">
                    <span className="text-lg">Contact Us</span>
                    <ArrowRight className="w-5 h-5 arrow-animate" />
                  </button>
                </>
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
            <div className="lg:hidden border-t border-gray-200 animate-fade-in-down">
              <nav className="py-4 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={index} className="menu-item">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-lg transition-all duration-300"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                    >
                      <span className="font-semibold">{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="px-4 py-2 space-y-2 animate-scale-in">
                        {dropdownContent[item.name]?.map((dropItem, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300"
                          >
                            <div className="flex-shrink-0 text-blue-600 mt-1">
                              {dropItem.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                {dropItem.title}
                              </h3>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {dropItem.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoggedIn && (
                  <div className="px-4 pt-4 space-y-3 border-t border-gray-200 mt-4">
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
                        className="block w-full px-4 py-3 border-2 border-green-500 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold text-center"
                      >
                        Dashboard
                      </a>
                    )}

                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-red-500 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </Container>
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
