import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import TelegramChatOverlay from "../../components/TelegramChatOverlay/TelegramChatOverlay";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .btn-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-33 items-center">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full mb-8 ${
                isVisible ? "animate-fade-in-left opacity-0" : "opacity-0"
              }`}
            >
              <span className="text-2xl">🎯</span>
              <span className="font-bold text-sm">O'zbekistonda birinchi</span>
            </div>
            <div className="space-y-2 mb-8">
              <h1
                className={`text-6xl md:text-7xl lg:text-6xl font-extrabold text-gray-900 leading-none ${
                  isVisible
                    ? "animate-fade-in-left opacity-0 delay-100"
                    : "opacity-0"
                }`}
                style={{ fontWeight: 900 }}
              >
                Online to'lovlarda
              </h1>

              <h2
                className={`text-6xl md:text-7xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-none ${
                  isVisible
                    ? "animate-fade-in-left opacity-0 delay-200"
                    : "opacity-0"
                }`}
                style={{ fontWeight: 900 }}
              >
                100% xavfsizlik
              </h2>
            </div>
            <p
              className={`text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed ${
                isVisible
                  ? "animate-fade-in-left opacity-0 delay-300"
                  : "opacity-0"
              }`}
            >
              Dacha ijara, avtomobil sotib olish yoki online xizmatlar uchun
              to'lov qilyapsizmi?{" "}
              <span className="font-bold text-gray-900">TASDIQ</span> pulingizni
              himoyalaydi - siz tovarni olguningizcha pul xavfsiz saqlanadi.
            </p>
            <div
              className={`flex flex-wrap gap-4 mb-10 ${
                isVisible
                  ? "animate-fade-in-left opacity-0 delay-400"
                  : "opacity-0"
              }`}
            >
              <button className="btn-hover px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-xl hover:bg-green-600 transition-all duration-300">
                Demoni ko'rish
              </button>

              <button className="px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                Qanday ishlaydi?
              </button>
            </div>
            <div
              className={`flex flex-wrap gap-4 ${
                isVisible
                  ? "animate-fade-in-left opacity-0 delay-500"
                  : "opacity-0"
              }`}
            >
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-5 py-3 rounded-full border border-green-200">
                <Check className="w-5 h-5" />
                <span className="font-semibold text-sm">Bank litsenziyasi</span>
              </div>

              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-5 py-3 rounded-full border border-green-200">
                <Check className="w-5 h-5" />
                <span className="font-semibold text-sm">256-bit shifrash</span>
              </div>
            </div>
          </div>

          <div
            className={`relative ml-50 ${
              isVisible
                ? "animate-fade-in-right opacity-0 delay-300"
                : "opacity-0"
            }`}
          >
            <div className="relative w-full h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-30 blur-3xl"></div>
              </div>

              <TelegramChatOverlay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
