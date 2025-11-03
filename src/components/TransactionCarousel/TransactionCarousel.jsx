import React, { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  FileCheck,
  DollarSign,
  Package,
  Shield,
  CheckCircle,
  Users,
  CreditCard,
  Lock,
} from "lucide-react";

const TransactionStepsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const steps = [
    {
      icon: <FileCheck className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Agree terms",
      description:
        "Once the buyer and seller have negotiated the price, we automatically create the transaction.",
    },
    {
      icon: (
        <DollarSign className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
      ),
      title: "Payment acceptance",
      description:
        "We process the payment from the buyer via a client-customised payment page and the funds enter the Trustap Vault.",
    },
    {
      icon: <Package className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Shipping & Fulfilment",
      description:
        "We track the fulfilment of every order from the seller to the buyer. This can be via courier/post or by a multitude of other flexible confirmation mechanisms.",
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Secure Transaction",
      description:
        "Every transaction is secured with bank-level encryption and fraud detection systems to protect both buyers and sellers.",
    },
    {
      icon: (
        <CheckCircle className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
      ),
      title: "Verification Process",
      description:
        "We verify all parties involved in the transaction to ensure legitimacy and build trust in the marketplace ecosystem.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Customer Support",
      description:
        "Our dedicated support team is available 24/7 to assist with any questions or issues throughout the transaction process.",
    },
    {
      icon: (
        <CreditCard className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
      ),
      title: "Payment Options",
      description:
        "Accept multiple payment methods including credit cards, bank transfers, and digital wallets for maximum convenience.",
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Escrow Protection",
      description:
        "Funds are held securely in escrow until both parties confirm the transaction is complete, ensuring peace of mind.",
    },
    {
      icon: <Package className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: "Delivery Confirmation",
      description:
        "Track your delivery in real-time and receive instant notifications when the package reaches its destination.",
    },
  ];

  const totalGroups = Math.ceil(steps.length / 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < totalGroups - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: newIndex * containerWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: newIndex * containerWidth,
          behavior: "smooth",
        });
      }
    }
  };

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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .arrow-animate {
          transition: transform 0.3s ease;
        }

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

        .btn-hover:hover .arrow-animate {
          transform: translateX(5px);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: #3b82f6;
        }
      `}</style>

      <div ref={sectionRef} className="mx-auto">
        <div
          ref={scrollContainerRef}
          className={`flex gap-16 overflow-x-hidden pb-8 scroll-smooth px-8 ${
            isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
          }`}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`card-hover flex-shrink-0 w-[calc(33.333%-21.33px)] bg-white rounded-3xl border-2 border-gray-200 p-12 ${
                isVisible ? "animate-fade-in-left opacity-0" : "opacity-0"
              }`}
              style={{
                minWidth: "350px",
                scrollSnapAlign: "start",
                animationDelay: `${0.2 + (index % 3) * 0.1}s`,
              }}
            >
              <div className="mb-6 text-5xl">{step.icon}</div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                {step.title}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center justify-center mt-8 ${
            isVisible ? "animate-scale-in opacity-0 delay-400" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-0">
            <div className="w-10 flex items-center justify-center mr-2">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex gap-0">
              {Array.from({ length: totalGroups }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 transition-all duration-300 ${
                    index === currentIndex
                      ? "w-96 bg-blue-600"
                      : "w-96 bg-gray-300"
                  }`}
                  style={{
                    borderRadius:
                      index === 0
                        ? "9999px 0 0 9999px"
                        : index === totalGroups - 1
                        ? "0 9999px 9999px 0"
                        : "0",
                  }}
                ></div>
              ))}
            </div>

            <div className="w-10 flex items-center justify-center ml-2">
              {currentIndex < totalGroups - 1 && (
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowRight className="w-6 h-6 text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex justify-center mt-12 ${
            isVisible ? "animate-fade-in-up opacity-0 delay-500" : "opacity-0"
          }`}
        >
          <button className="btn-hover flex items-center space-x-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold transform">
            <span>Learn more</span>
            <ArrowRight className="w-5 h-5 arrow-animate" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionStepsSection;
