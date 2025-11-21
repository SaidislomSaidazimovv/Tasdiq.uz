import React, { useState, useEffect, useRef } from "react";
import Container from "../../Layout/Container";
import { Check } from "lucide-react";

const UseForWho = () => {
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

  const useCases = [
    {
      icon: "🏡",
      title: "Uy-joy ijarasi",
      description:
        "Kvartira yoki dacha ijarasi uchun katta to'lovlarni xavfsiz amalga oshiring.",
      features: [
        "Depozit himoyasi",
        "Soxta e'lonlardan himoya",
        "Kelishuv kafolati",
      ],
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: "🚗",
      title: "Avtomobil savdosi",
      description:
        "Ishlatilgan avtomobillarni xavfsiz sotib oling yoki soting.",
      features: [
        "Hujjatlarni tekshirish",
        "Texnik holatni tasdiqlash",
        "Xavfsiz pul o'tkazish",
      ],
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      icon: "💼",
      title: "Frilans xizmatlar",
      description: "Loyiha ishlari uchun to'lovlarni kafolatlang.",
      features: ["Ish sifati kafolati", "Vaqtida to'lov", "Shartnoma himoyasi"],
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-12px) rotate(2deg) scale(1.03);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .card-hover:hover .icon-container {
          animation: float 2s ease-in-out infinite;
        }

        .card-hover:hover .feature-item {
          transform: translateX(5px);
        }

        .feature-item {
          transition: transform 0.3s ease;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div ref={sectionRef} className="bg-white py-20">
        <Container>
          <div className="space-y-16">
            <div
              className={`text-center space-y-4 ${
                isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Kim uchun foydali?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                TASDIQ har qanday online to'lov uchun mos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className={`card-hover bg-white rounded-3xl p-8 border-2 border-gray-100 ${
                    isVisible
                      ? `animate-scale-in opacity-0 delay-${(index + 2) * 100}`
                      : "opacity-0"
                  }`}
                >
                  <div className="mb-6">
                    <div
                      className={`icon-container w-20 h-20 ${useCase.iconBg} rounded-2xl flex items-center justify-center text-4xl`}
                    >
                      {useCase.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {useCase.description}
                  </p>
                  <div className="space-y-3">
                    {useCase.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="feature-item flex items-start space-x-3"
                      >
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* <div
              className={`text-center ${
                isVisible ? "animate-fade-in-up opacity-0 delay-500" : "opacity-0"
              }`}
            >
              <p className="text-gray-600 text-lg mb-6">
                Sizning vaziyatingiz ro'yxatda yo'qmi?
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Boshqa foydalanish holatlari
              </button>
            </div> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default UseForWho;
