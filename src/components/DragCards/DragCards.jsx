import React, { useState, useRef, useEffect } from "react";
import Container from "../Layout/Container";

const DragCardsSection = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Buyer sends payment", placed: false },
    { id: 2, text: "Payment held securely", placed: false },
    { id: 3, text: "Seller ships item", placed: false },
    { id: 4, text: "Buyer inspects item", placed: false },
    { id: 5, text: "Buyer confirms receipt", placed: false },
    { id: 6, text: "Payment released to seller", placed: false },
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const trustapRef = useRef(null);
  const sectionRef = useRef(null);

  const placedCount = cards.filter((c) => c.placed).length;
  const completionPercentage = Math.round((placedCount / cards.length) * 100);
  const unplacedCards = cards.filter((c) => !c.placed);

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

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedCard) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === draggedCard.id ? { ...card, placed: true } : card
        )
      );
    }
    setDraggedCard(null);
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

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
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
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      <Container>
        <div
          ref={sectionRef}
          className="mx-auto flex flex-col md:flex-row justify-between items-center gap-16"
        >
          <div
            className={`md:w-1/2 text-left space-y-6 ml-8 ${
              isVisible ? "animate-fade-in-left opacity-0" : "opacity-0"
            }`}
          >
            <h2 className="text-5xl text-black mb-18">How does it work?</h2>
            <p className="text-lg text-gray-600">
              Trustap simplifies transactions by securely holding the buyer's
              payment in the Trustap Vault until the order is fulfilled and
              inspected. Once both parties are satisfied, the funds are
              released, ensuring a smooth and worry-free process.
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col items-center space-y-12 ml-60">
            <div
              ref={trustapRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative w-full max-w-80 ${
                isVisible ? "animate-scale-in opacity-0 delay-200" : "opacity-0"
              }`}
            >
              <div className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-100 transition-all duration-700 ease-out"
                  style={{
                    clipPath: `inset(0 ${100 - completionPercentage}% 0 0)`,
                  }}
                />
                <div className="relative z-10 p-8 text-center">
                  <h3 className="text-4xl font-bold text-blue-600">Tasdiq</h3>
                </div>
              </div>
            </div>

            <div
              className={`relative w-full max-w-64 ${
                isVisible
                  ? "animate-fade-in-up opacity-0 delay-400"
                  : "opacity-0"
              }`}
              style={{ minHeight: "330px" }}
            >
              {unplacedCards.map((card, index) => {
                const isTopCard = index === unplacedCards.length - 1;

                return (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card)}
                    onDragEnd={() => setDraggedCard(null)}
                    className={`absolute w-full bg-white border-2 border-gray-300 rounded-3xl transition-all duration-500 ease-out ${
                      isTopCard
                        ? "hover:border-b-blue-600"
                        : "pointer-events-none"
                    } ${draggedCard?.id === card.id ? "opacity-0" : ""}`}
                    style={{
                      bottom: `${index * 10}px`,
                      top: `${index * 0}px`,
                      left: `${index * 0}px`,
                      transform: `translateX(0%)`,
                      zIndex: index + 1,
                    }}
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-blue-600 font-semibold text-lg">
                          {card.text}
                        </span>
                      </div>

                      <div className="flex items-center justify-center py-6">
                        <div className="relative"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DragCardsSection;
