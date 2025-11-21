import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../../Layout/Container";
import TrustedBySection from "../../components/TrustedBy/TrustedBy";
import DragCards from "../../components/DragCards/DragCards";
import TransactionStepsCarousel from "../../components/TransactionCarousel/TransactionCarousel";
import PartnersMarketplace from "../../components/Partners/PartnersMarketplace";
import StripePartnerBanner from "../../components/StripeBanner/StripeBanner";
import Comments from "../../components/Comments/Comments";
import HomeMainImg from "../../assets/hero_main_img.png";
import TelegramChatOverlay from "../../components/TelegramChatOverlay/TelegramChatOverlay";
import ManualCard from "../../components/ManualCard/ManualCard";
import B2BPayments from "../../components/B2B/B2BPayments";
import HeroSection from "../HeroSection/HeroSection";
import ComparisonTable from "../../components/ComparisonTable/ComparisonTable";
// import { motion } from "framer-motion";

const TypingText = () => {
  const words = ["Individuals", "Startups", "YOU", "Marketplaces", "eCommerce"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 330);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="relative inline-block">
      {currentText}
      <span
        className={`inline-block w-0.5 h-10 bg-blue-600 align-sub transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

const AnimatedCounter = ({
  start = 0,
  end,
  duration = 3000,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounter = () => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const currentValue = Math.floor(start + (end - start) * progress);
        setCount(currentValue);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  };

  const finalText = `${prefix}${end.toLocaleString()}${suffix}`;

  return (
    <span
      ref={counterRef}
      className="inline-block tabular-nums"
      style={{ minWidth: `${finalText.length * 0.6}em` }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .btn-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }

        .btn-hover:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .arrow-animate {
          transition: transform 0.3s ease;
        }
      `}</style>

      <main className="min-h-screen bg-white pt-50">
        <Container size="large">
            {/* <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h1
                    className={`text-5xl md:text-7xl font-bold text-black leading-tight ${
                      isVisible ? "animate-fade-in-left opacity-0" : "opacity-0"
                    }`}
                  >
                    Trust in every
                    <br />
                    <span className="text-black">transaction</span>
                  </h1>

                  <h2
                    className={`text-2xl md:text-4xl font-bold text-blue-600 ${
                      isVisible
                        ? "animate-fade-in-left opacity-0 delay-200"
                        : "opacity-0"
                    }`}
                  >
                    Built for <TypingText />
                  </h2>

                  <p
                    className={`text-lg md:text-2xl text-gray-600 max-w-2xl font-normal ${
                      isVisible
                        ? "animate-fade-in-left opacity-0 delay-300"
                        : "opacity-0"
                    }`}
                  >
                    An end-to-end transaction solution that seamlessly
                    integrates payments, fulfilment and support into your
                    marketplace or ecommerce store.
                  </p>
                </div>

                <button
                  className={`btn-hover inline-flex items-center space-x-2 px-8 py-4 border-2 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-white hover:text-blue-600 ${
                    isVisible
                      ? "animate-fade-in-left opacity-0 delay-400"
                      : "opacity-0"
                  }`}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowRight className="w-6 h-6 relative z-10" />
                </button>
              </div>

              <div
                className={`relative ${
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
            </div> */}

            <section>
              <HeroSection/>
            </section>

          <div
            className={`w-full bg-white py-30 px-4 ${
              isVisible ? "animate-fade-in-up opacity-0 delay-500" : "opacity-0"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between gap-8 md:gap-16 flex-wrap md:flex-nowrap">
                <div className="stat-card flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                      <AnimatedCounter end={10} prefix="$" suffix="M+" />
                    </p>
                    <p className="text-gray-600 text-2xl">Monthly GMV</p>
                  </div>
                </div>

                <div className="animate-pulse-custom">
                  <img
                    src="https://www.trustap.com/wp-content/uploads/2024/10/separator.svg"
                    alt=""
                    className="h-24 md:h-50"
                  />
                </div>

                <div className="stat-card flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                      <AnimatedCounter end={250} suffix="+" />
                    </p>
                    <p className="text-gray-600 text-2xl">
                      Marketplace Partners
                    </p>
                  </div>
                </div>

                <div className="animate-pulse-custom">
                  <img
                    src="https://www.trustap.com/wp-content/uploads/2024/10/separator.svg"
                    alt=""
                    className="h-24 md:h-50"
                  />
                </div>

                <div className="stat-card flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                      <AnimatedCounter end={840000} suffix="+" />
                    </p>
                    <p className="text-gray-600 text-2xl">Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* <div>
          <TrustedBySection />
        </div> */}

        <section className="relative w-full bg-[#f8f7ff] py-20 px-8 overflow-hidden">
          <DragCards />
        </section>

        <section>
          <ComparisonTable/>
        </section>

        <Container>
        {/* <section>
          <ManualCard/>
        </section>
        <section>
          <B2BPayments/>
        </section> */}
          <section className="relative w-full py-30 px-8 overflow-hidden">
            <TransactionStepsCarousel />
          </section>
          <section>
            <PartnersMarketplace />
          </section>
          <section>
            <Comments />
          </section>
        </Container>
        {/* <section>
          <StripePartnerBanner />
        </section> */}
      </main>
    </>
  );
};

export default Home;
