import React, { useState, useEffect, useRef } from "react";
import Container from "../../Layout/Container";

const TrustStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    amount: 0,
    resolution: 0,
    satisfaction: 0,
  });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const finalValues = {
    users: 1000,
    amount: 2.5,
    resolution: 48,
    satisfaction: 99.8,
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          animateCounters();
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

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        users: Math.floor(finalValues.users * progress),
        amount: parseFloat((finalValues.amount * progress).toFixed(1)),
        resolution: Math.floor(finalValues.resolution * progress),
        satisfaction: parseFloat(
          (finalValues.satisfaction * progress).toFixed(1)
        ),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(finalValues);
      }
    }, stepDuration);
  };

  const stats = [
    {
      value: `${counters.users}+`,
      label: "Himoyalangan to'lovlar",
      color: "text-blue-600",
    },
    {
      value: `$${counters.amount}M`,
      label: "Xavfsiz o'tkazilgan",
      color: "text-blue-600",
    },
    {
      value: `${counters.resolution}h`,
      label: "Nizolarni hal qilish",
      color: "text-blue-600",
    },
    {
      value: `${counters.satisfaction}%`,
      label: "Mijozlar qoniqishi",
      color: "text-blue-600",
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
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.3);
        }

        .stat-card:hover .stat-value {
          animation: pulse 1s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <div
        ref={sectionRef}
        className="bg-gradient-to-b from-gray-50 to-white py-20"
      >
        <Container>
          <div className="space-y-16">
            <div
              className={`text-center ${
                isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Nega bizga ishonishadi?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`stat-card bg-white rounded-2xl p-8 text-center border-2 border-gray-100 ${
                    isVisible
                      ? `animate-scale-in opacity-0 delay-${(index + 1) * 100}`
                      : "opacity-0"
                  }`}
                >
                  <div className="stat-value">
                    <p
                      className={`text-5xl md:text-6xl font-bold ${stat.color} mb-3`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-gray-600 text-lg font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            {/* <div
              className={`text-center ${
                isVisible ? "animate-fade-in-up opacity-0 delay-400" : "opacity-0"
              }`}
            >
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Minglab mijozlar TASDIQ orqali xavfsiz va ishonchli tranzaksiyalar amalga oshirmoqda
              </p>
            </div> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default TrustStatsSection;
