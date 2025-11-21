import React, { useState, useEffect, useRef } from "react";
import Container from "../../Layout/Container";
import { Check, ArrowRight } from "lucide-react";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d+]/g, "");
    setPhoneNumber(cleaned);
  };

  const features = [
    "Kredit karta talab qilinmaydi",
    "30 kunlik sinov",
    "Bekor qilish istalgan vaqtda",
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .btn-shimmer {
          background: linear-gradient(
            90deg,
            #10b981 0%,
            #059669 40%,
            #10b981 50%,
            #059669 60%,
            #10b981 100%
          );
          background-size: 200% auto;
          transition: all 0.3s ease;
        }

        .btn-shimmer:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.5);
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: scale(1.02);
          box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <div
        ref={sectionRef}
        className="bg-[#0a1929] py-24 w-full"
        id="registration"
      >
        {/* <Container> */}
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Xavfsizlikni bugundan boshlang
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Birinchi 200 foydalanuvchi uchun komissiya atigi 1%. Oddiy
              to'lovdan TASDIQ himoyasiga o'ting.
            </p>
          </div>
          <div
            className={`flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto ${
              isVisible
                ? "animate-fade-in-scale opacity-0 delay-200"
                : "opacity-0"
            }`}
          >
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+998 90 123 45 67"
              className="input-focus flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
            />

            <button className="btn-shimmer flex items-center justify-center space-x-2 px-8 py-4 text-white text-lg font-bold rounded-xl">
              <span>Ro'yxatdan o'tish</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div
            className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-300 ${
              isVisible ? "animate-fade-in-up opacity-0 delay-400" : "opacity-0"
            }`}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
          {/* <div
              className={`pt-8 ${
                isVisible ? "animate-fade-in-up opacity-0 delay-300" : "opacity-0"
              }`}
            >
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-semibold">
                    1000+ foydalanuvchi ishonch bildirdi
                  </span>
                </div>
              </div>
            </div> */}
        </div>
        {/* </Container> */}
      </div>
    </>
  );
};

export default CTASection;
