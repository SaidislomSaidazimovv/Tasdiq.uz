import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/Layout/Container";
import { ArrowRight } from "lucide-react";
import HomeAnimationIMage from "../../assets/home_animation.png";
import TrustedBySection from "../../components/TrustedBy/TrustedBy";
import DragCards from "../../components/DragCards/DragCards";

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
  return (
    <>
      <main className="min-h-screen bg-white pt-50 pb-16">
        <Container size="large">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="space-y-6 mt-15">
                <h1 className="text-7xl font-bold text-black leading-tight">
                  Trust in every
                  <br />
                  <span className="text-black">transaction</span>
                </h1>

                <h2 className="text-3xl lg:text-4xl font-bold text-blue-600">
                  Built for <TypingText />
                </h2>

                <p className="text-2xl text-gray-600 max-w-2xl font-normal">
                  An end-to-end transaction solution that seamlessly integrates
                  payments, fulfilment and support into your marketplace or
                  ecommerce store.
                </p>
              </div>

              <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all hover:bg-white hover:text-blue-600">
                <span>Get in Touch</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="relative ml-15">
              <img
                className="w-150"
                src={HomeAnimationIMage}
                alt="AnimationImage"
              />
            </div>
          </div>

          <div className="w-full bg-white py-30 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between gap-8 md:gap-16 flex-wrap md:flex-nowrap">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                      <AnimatedCounter end={10} prefix="$" suffix="M+" />
                    </p>
                    <p className="text-gray-600 text-2xl">Monthly GMV</p>
                  </div>
                </div>

                <div>
                  <img
                    src="https://www.trustap.com/wp-content/uploads/2024/10/separator.svg"
                    alt=""
                    className="h-24 md:h-50"
                  />
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                      <AnimatedCounter end={250} suffix="+" />
                    </p>
                    <p className="text-gray-600 text-2xl">
                      Marketplace Partners
                    </p>
                  </div>
                </div>

                <div>
                  <img
                    src="https://www.trustap.com/wp-content/uploads/2024/10/separator.svg"
                    alt=""
                    className="h-24 md:h-50"
                  />
                </div>

                <div className="flex flex-col items-center justify-center">
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

          <div>
            <TrustedBySection />
          </div>
          
          <div>
            <DragCards/>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
