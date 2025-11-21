import React, { useState, useRef, useEffect } from "react";
import Container from "../../Layout/Container";
import { Check } from "lucide-react";

const DragCardsSection = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Sotuvchi bilan kelishing", placed: false },
    { id: 2, text: "Pulingizni TASDIQ orqali to'lang", placed: false },
    { id: 3, text: "Tovar yoki xizmatni oling", placed: false },
    {
      id: 4,
      text: "Narsa kelishilgandek ekanligini tekshiring",
      placed: false,
    },
    { id: 5, text: "Agar barchasi yaxshi bo'lsa - tasdiqlang", placed: false },
    { id: 6, text: "Pul sotuvchiga o'tadi", placed: false },
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const trustapRef = useRef(null);
  const sectionRef = useRef(null);

  const placedCount = cards.filter((c) => c.placed).length;
  const completionPercentage = Math.round((placedCount / cards.length) * 100);
  const unplacedCards = cards.filter((c) => !c.placed);
  const allCardsPlaced = placedCount === cards.length;

  const steps = [
    {
      number: "1",
      title: "To'lovni amalga oshiring",
      description:
        "Sotuvchi bilan kelishing va pulingizni TASDIQ orqali to'lang. Pul xavfsiz eskrou hisobida saqlanadi.",
      icon: "💳",
      color: "blue",
    },
    {
      number: "2",
      title: "Tovarni tekshiring",
      description:
        "Tovar yoki xizmatni oling va hamma narsa kelishilgandek ekanligini tekshiring. Vaqtingiz bor!",
      icon: "📦",
      color: "blue",
    },
    {
      number: "3",
      title: "Tasdiqlang",
      description:
        "Agar barchasi yaxshi bo'lsa - tasdiqlang va pul sotuvchiga o'tadi. Aks holda - pulingiz qaytariladi.",
      icon: "✓",
      color: "green",
    },
  ];

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

  useEffect(() => {
    if (allCardsPlaced) {
      setTimeout(() => {
        setShowSteps(true);
      }, 500);
    }
  }, [allCardsPlaced]);

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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-slide-down {
          animation: slideDown 0.8s ease-out forwards;
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

      <Container>
        <div ref={sectionRef} className="py-20" id="how-it-works">
          {!showSteps ? (
            <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
              <div
                className={`md:w-1/2 text-left space-y-6 ml-7 ${
                  isVisible ? "animate-fade-in-left opacity-0" : "opacity-0"
                }`}
              >
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Qanday ishlaydi?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  TASDIQ xaridorning to'lovini xavfsiz saqlaydi va buyurtma
                  bajarilgach, tekshirilgach pulni sotuvchiga o'tkazadi. Ikkala
                  tomon ham xotirjam!
                </p>
              </div>

              <div className="md:w-1/2 flex flex-col items-center space-y-12">
                <div
                  ref={trustapRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`relative w-full max-w-80 ${
                    isVisible
                      ? "animate-scale-in opacity-0 delay-200"
                      : "opacity-0"
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
                      <h3 className="text-4xl font-bold text-blue-600">
                        TASDIQ
                      </h3>
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
          ) : (
            <div className="space-y-12">
              <div className="text-center space-y-4 animate-slide-down opacity-0">
                <h2 className="text-5xl font-bold text-gray-900">
                  3 oddiy qadam
                </h2>
                <p className="text-xl text-gray-600">
                  Xavfsiz to'lov qilish hech qachon bunday oson bo'lmagan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl animate-fade-in-up opacity-0 delay-${
                      (index + 1) * 100
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                          step.color === "green"
                            ? "bg-green-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {step.color === "green" ? (
                          <Check className="w-10 h-10 text-green-600" />
                        ) : (
                          <span
                            className={`text-3xl font-bold ${
                              step.color === "green"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            {step.number}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default DragCardsSection;
