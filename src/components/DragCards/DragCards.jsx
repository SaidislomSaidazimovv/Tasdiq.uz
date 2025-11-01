import React, { useState, useEffect, useRef } from 'react';

const DragCardsSection = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Buyer sends payment', placed: false },
    { id: 2, text: 'Payment held securely', placed: false },
    { id: 3, text: 'Seller ships item', placed: false },
    { id: 4, text: 'Buyer inspects item', placed: false },
    { id: 5, text: 'Buyer confirms receipt', placed: false },
    { id: 6, text: 'Payment released to seller', placed: false }
  ]);
  
  const [draggedCard, setDraggedCard] = useState(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showDragMe, setShowDragMe] = useState(false);
  const [cursorPhase, setCursorPhase] = useState('idle');
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const trustapRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const placedCount = cards.filter(c => c.placed).length;
  const completionPercentage = Math.round((placedCount / cards.length) * 100);
  const unplacedCards = cards.filter(c => !c.placed);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasInteracted && unplacedCards.length > 0) {
            setTimeout(() => {
              setShowDragMe(true);
              setTimeout(() => {
                setShowCursor(true);
                setCursorPhase('moveToCard');
              }, 800);
            }, 500);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasInteracted, unplacedCards.length]);

  useEffect(() => {
    if (!showCursor || hasInteracted || !cardsRef.current || !trustapRef.current) return;

    const cardsRect = cardsRef.current.getBoundingClientRect();
    const trustapRect = trustapRef.current.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();

    const cardX = cardsRect.left + cardsRect.width / 2 - sectionRect.left;
    const cardY = cardsRect.top + cardsRect.height / 2 - sectionRect.top;
    const trustapX = trustapRect.left + trustapRect.width / 2 - sectionRect.left;
    const trustapY = trustapRect.top + trustapRect.height / 2 - sectionRect.top;

    let animationFrame;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (cursorPhase === 'moveToCard') {
        if (elapsed < 1000) {
          const progress = elapsed / 1000;
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setCursorPosition({
            x: cardX * easeProgress,
            y: cardY * easeProgress
          });
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCursorPosition({ x: cardX, y: cardY });
          startTime = Date.now();
          setCursorPhase('hoverCard');
        }
      } else if (cursorPhase === 'hoverCard') {
        if (elapsed < 800) {
          const wobble = Math.sin(elapsed / 100) * 3;
          setCursorPosition({ x: cardX + wobble, y: cardY + wobble });
          animationFrame = requestAnimationFrame(animate);
        } else {
          startTime = Date.now();
          setCursorPhase('dragToTrustap');
        }
      } else if (cursorPhase === 'dragToTrustap') {
        if (elapsed < 1500) {
          const progress = elapsed / 1500;
          const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          setCursorPosition({
            x: cardX + (trustapX - cardX) * easeProgress,
            y: cardY + (trustapY - cardY) * easeProgress
          });
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCursorPosition({ x: trustapX, y: trustapY });
          startTime = Date.now();
          setCursorPhase('hoverTrustap');
        }
      } else if (cursorPhase === 'hoverTrustap') {
        if (elapsed < 500) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setShowCursor(false);
          setShowDragMe(false);
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showCursor, cursorPhase, hasInteracted]);

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    setHasInteracted(true);
    setShowCursor(false);
    setShowDragMe(false);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (draggedCard) {
      setCards(cards.map(card => 
        card.id === draggedCard.id ? { ...card, placed: true } : card
      ));
    }
    
    setDraggedCard(null);
  };

  const handleReset = () => {
    setCards(cards.map(card => ({ ...card, placed: false })));
    setHasInteracted(false);
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          How does it work?
        </h2>
        
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Trustap simplifies transactions by securely holding the buyer's payment until the order is fulfilled.
        </p>

        <div className="flex flex-col items-center space-y-12">
          <div 
            ref={trustapRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative w-full max-w-md"
          >
            <div className="bg-white rounded-3xl border-2 border-gray-300 shadow-lg p-8 transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-blue-600">trustap</span>
              </div>
              
              <div className="relative">
                <div className="w-full h-12 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 transition-all duration-700 ease-out flex items-center justify-end pr-4"
                    style={{ width: `${completionPercentage}%` }}
                  >
                    {completionPercentage > 0 && (
                      <span className="text-white font-bold text-lg">
                        {completionPercentage}%
                      </span>
                    )}
                  </div>
                </div>
                
                {completionPercentage === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gray-400 font-semibold">Drop cards here</span>
                  </div>
                )}
              </div>

              {completionPercentage === 100 && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-400 rounded-2xl text-center">
                  <div className="text-green-600 font-bold text-lg mb-1">
                    🎉 Process Complete!
                  </div>
                  <p className="text-green-600 text-sm">
                    All steps completed successfully
                  </p>
                </div>
              )}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-16 bg-gray-300"></div>
          </div>

          <div ref={cardsRef} className="relative w-full max-w-md" style={{ minHeight: '350px' }}>
            {showDragMe && unplacedCards.length > 0 && (
              <div 
                className="absolute z-50 animate-bounce"
                style={{
                  top: '-70px',
                  right: '-40px'
                }}
              >
                <div className="relative">
                  <div className="bg-white border-3 border-gray-900 px-5 py-3 rounded-full flex items-center space-x-3 shadow-xl">
                    <span className="text-3xl">👆</span>
                    <span className="font-bold text-gray-900 text-lg">DRAG ME</span>
                  </div>
                </div>
              </div>
            )}

            {unplacedCards.map((card, index) => {
              const stackIndex = unplacedCards.length - index - 1;
              const isTopCard = index === unplacedCards.length - 1;
              
              return (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card)}
                  className={`absolute w-full bg-white border-2 border-gray-300 rounded-3xl shadow-lg cursor-grab active:cursor-grabbing transition-all ${
                    draggedCard?.id === card.id ? 'opacity-30 scale-95' : 'hover:shadow-2xl hover:scale-105'
                  }`}
                  style={{
                    top: `${stackIndex * 16}px`,
                    left: `${stackIndex * 10}px`,
                    right: `${stackIndex * 10}px`,
                    zIndex: index + 1
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-blue-600 font-bold text-lg">
                        {card.text}
                      </span>
                      <div className="flex space-x-1.5">
                        <div className="w-1.5 h-7 bg-gray-300 rounded-full"></div>
                        <div className="w-1.5 h-7 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center py-6">
                      <div className="relative">
                        <div className="relative z-10 w-36 h-44 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-2xl transform -rotate-6">
                          <div className="absolute top-8 left-5 right-5">
                            <div className="h-10 bg-blue-400 rounded-lg opacity-60 mb-3"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-blue-300 rounded opacity-40"></div>
                              <div className="h-2 bg-blue-300 rounded opacity-40 w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute top-6 -right-10 z-20 w-24 h-28 bg-white border-2 border-gray-300 rounded-xl shadow-lg">
                          <div className="p-3 space-y-1.5">
                            <div className="h-1.5 bg-gray-300 rounded"></div>
                            <div className="h-1.5 bg-gray-300 rounded"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1.5 bg-gray-200 rounded"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                        
                        <div className="absolute -bottom-3 -right-6 z-5 w-20 h-24 bg-gray-100 border-2 border-gray-200 rounded-lg opacity-60 flex items-center justify-center">
                          <div className="text-4xl">📦</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {stackIndex > 0 && (
                    <>
                      <div className="absolute inset-x-2 -bottom-1 h-2 bg-gray-200 rounded-b-3xl -z-10"></div>
                      {stackIndex > 1 && (
                        <div className="absolute inset-x-4 -bottom-2 h-2 bg-gray-100 rounded-b-3xl -z-20"></div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {unplacedCards.length === 0 && (
              <div className="flex items-center justify-center h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-gray-500 font-semibold">All cards placed!</p>
                </div>
              </div>
            )}
          </div>

          {placedCount > 0 && (
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Reset & Try Again
            </button>
          )}
        </div>
      </div>

      {showCursor && (
        <div 
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path 
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
              fill="#1f2937" 
              stroke="#000" 
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DragCardsSection;