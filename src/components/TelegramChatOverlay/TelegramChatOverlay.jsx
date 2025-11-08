import React, { useState, useEffect, useRef } from "react";

const TelegramChatOverlay = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  const chatMessages = [
    {
      id: 1,
      user: "seller",
      name: "Dacha Egasi",
      message:
        "Charvakdagi dacha uchun 2 000 000 so'm depozit o'tkazing, hoziroq 💸",
      isUser: false,
    },
    {
      id: 2,
      user: "buyer",
      name: "Siz",
      message: "Siz haqiqiy ekanligingizni qayerdan bilaman?",
      isUser: true,
    },
    {
      id: 3,
      user: "seller",
      name: "Dacha Egasi",
      message: "Ishoning aka 👍",
      isUser: false,
    },
    {
      id: 4,
      user: "system",
      name: "Ogohlantirish",
      message: "⚠️ 3 kun oldin Kamila xuddi shu yerda 2 000 000 so'm yo'qotdi!",
      isUser: false,
      type: "alert",
    },
    {
      id: 5,
      user: "system",
      name: "Statistika",
      message:
        "📊 Har hafta Toshkentda 47 ta oila ijara firibgarligi tufayli pul yo'qotadi.",
      isUser: false,
      type: "banner",
    },
    {
      id: 6,
      user: "system",
      name: "Himoya",
      message: "✅ TASDIQ orqali himoyalaning!",
      isUser: false,
      type: "success",
    },
    {
      id: 7,
      user: "buyer",
      name: "Siz",
      message:
        "TASDIQ orqali qilaylik — kalitni olgunimcha pul litsenziyalangan bankda saqlanadi.",
      isUser: true,
    },
    {
      id: 8,
      user: "seller",
      name: "Dacha Egasi",
      message: "Kelishildi! Mana TASDIQ havolasi 🔗",
      isUser: false,
    },
  ];

  useEffect(() => {
    if (currentMessageIndex >= chatMessages.length) {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
        setIsTyping(false);
        setSelectedSystem(null);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }

    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setMessages((prev) => [...prev, chatMessages[currentMessageIndex]]);
      setIsTyping(false);
      const nextMessageTimer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(nextMessageTimer);
    }, 1500);

    return () => clearTimeout(typingTimer);
  }, [currentMessageIndex]);

  useEffect(() => {
    if (chatEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSystemClick = (id) => {
    setSelectedSystem(id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden -mt-10">
      <div className="relative w-[300px] h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl">
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
            <div className="bg-[#0088cc] px-4 pt-3 pb-2 flex-shrink-0"></div>

            <div className="bg-[#0088cc] px-4 py-3 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <button className="text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-base">
                    Dacha Egasi
                  </h3>
                  <p className="text-xs text-blue-100">online</p>
                </div>
                <button className="text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 px-3 py-2 overflow-hidden bg-[#e5ddd5]"
            >
              <div className="flex flex-col justify-end min-h-full">
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className="animate-slide-up">
                      <div
                        className={`flex items-end space-x-1 ${
                          msg.isUser ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm transition transform ${
                            msg.type === "alert"
                              ? "bg-red-100 border border-red-400 text-red-700"
                              : msg.type === "banner"
                              ? "bg-yellow-100 border border-yellow-300 text-yellow-700"
                              : msg.type === "success"
                              ? "bg-green-100 border border-green-400 text-green-800 font-semibold"
                              : msg.isUser
                              ? "bg-[#dcf8c6]"
                              : "bg-white"
                          } ${
                            selectedSystem === msg.id
                              ? "scale-105 ring-2 ring-green-500"
                              : ""
                          }`}
                          onClick={() => msg.type && handleSystemClick(msg.id)}
                          style={{
                            cursor: msg.type ? "pointer" : "default",
                          }}
                        >
                          {!msg.isUser && !msg.type && (
                            <p className="text-xs font-semibold text-[#0088cc] mb-0.5">
                              {msg.name}
                            </p>
                          )}
                          <p className="text-sm">{msg.message}</p>

                          {selectedSystem === msg.id && (
                            <p className="text-[11px] text-gray-600 mt-1 italic">
                              Siz ushbu tanlovni bosdingiz ✅
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && currentMessageIndex < chatMessages.length && (
                    <div className="animate-slide-up">
                      <div
                        className={`flex items-end space-x-1 ${
                          chatMessages[currentMessageIndex].isUser
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 shadow-sm ${
                            chatMessages[currentMessageIndex].isUser
                              ? "bg-[#dcf8c6]"
                              : "bg-white"
                          }`}
                        >
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 px-2 py-2 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-2">
                  <input
                    type="text"
                    placeholder="Message"
                    className="bg-transparent w-full outline-none text-sm text-gray-800 cursor-not-allowed"
                    disabled
                  />
                </div>
                <button className="bg-[#0088cc] text-white p-2 rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-30"></div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TelegramChatOverlay;
