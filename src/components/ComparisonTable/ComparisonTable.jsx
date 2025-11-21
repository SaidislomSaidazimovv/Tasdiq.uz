import React, { useState, useEffect, useRef } from "react";
import Container from "../../Layout/Container";
import { X, Check } from "lucide-react";

const ComparisonTable = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const comparisonData = [
    {
      feature: "Pulni qaytarish kafolati",
      regular: false,
      tasdiq: true,
    },
    {
      feature: "Firibgarlikdan himoya",
      regular: false,
      tasdiq: true,
    },
    {
      feature: "Nizolarni hal qilish",
      regular: "225 kun (sud)",
      tasdiq: "48 soat",
    },
    {
      feature: "Tranzaksiya narxi",
      regular: "Bank komissiyasi",
      tasdiq: "2.5% dan",
    },
    {
      feature: "Huquqiy yordam",
      regular: false,
      tasdiq: true,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div ref={sectionRef} className="bg-gray-50 py-20" id="benefits">
        <Container>
          <div className="space-y-12">
            <div
              className={`text-center space-y-4 ${
                isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Nima uchun TASDIQ?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Oddiy to'lov vs TASDIQ bilan himoyalangan to'lov
              </p>
            </div>
            <div
              className={`max-w-5xl mx-auto ${
                isVisible
                  ? "animate-fade-in-scale opacity-0 delay-200"
                  : "opacity-0"
              }`}
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
                  <div></div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-600">
                      Oddiy to'lov
                    </h3>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600">
                      TASDIQ bilan
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {comparisonData.map((row, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 gap-4 p-6 hover:bg-gray-50 transition-colors duration-300 ${
                        isVisible
                          ? `animate-slide-in-left opacity-0 delay-${
                              (index + 3) * 100
                            }`
                          : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-gray-900 font-medium text-base md:text-lg">
                          {row.feature}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        {typeof row.regular === "boolean" ? (
                          row.regular ? (
                            <Check className="w-7 h-7 text-green-600" />
                          ) : (
                            <X className="w-7 h-7 text-red-600" />
                          )
                        ) : (
                          <span className="text-gray-700 text-center font-medium">
                            {row.regular}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        {typeof row.tasdiq === "boolean" ? (
                          row.tasdiq ? (
                            <Check className="w-7 h-7 text-green-600" />
                          ) : (
                            <X className="w-7 h-7 text-red-600" />
                          )
                        ) : (
                          <span className="text-gray-700 text-center font-medium">
                            {row.tasdiq}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={`text-center ${
                isVisible
                  ? "animate-fade-in-up opacity-0 delay-800"
                  : "opacity-0"
              }`}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Hoziroq boshlang
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ComparisonTable;
