import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Container from "../Layout/Container";
import Logo from '../../assets/tasdiq_logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white" : "bg-white"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-25">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src={Logo} alt="Trustap Logo" className="h-15 w-auto object-contain" />
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition-colors font-bold py-2">
                    <span className="font-mulish font-medium">{item.name}</span>
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
                            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group/item"
                          >
                            <div className="flex-shrink-0 text-blue-600 mt-1">
                              {dropItem.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1 group-hover/item:text-blue-600 transition-colors">
                                {dropItem.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed font-normal">
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

            <div className="hidden lg:flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-7 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium">
                <span className="font-mulish text-lg font-bold">Transact Now</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="flex items-center space-x-2 px-7 py-3 border-2 border-blue-600 bg-blue-600 text-white rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all font-medium">
                <span className="font-mulish text-lg font-bold">Contact Us</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
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
            <div className="lg:hidden border-t border-gray-200">
              <nav className="py-4 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                    >
                      <span className="font-medium font-mulish">
                        {item.name}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="px-4 py-2 space-y-2">
                        {dropdownContent[item.name]?.map((dropItem, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
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
                <div className="pt-4 px-4 space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-semibold">
                    <span className="font-mulish">Transact Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-600/30">
                    <span className="font-mulish">Contact Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>
    </>
  );
};

export default Header;
