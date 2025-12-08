// import React, { useState, useEffect, useRef } from "react";
// import Container from "../../Layout/Container";
// import { Check, ArrowRight } from "lucide-react";

// const CTASection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.2,
//       rootMargin: "0px 0px -50px 0px",
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       });
//     }, observerOptions);

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const handlePhoneChange = (e) => {
//     const value = e.target.value;
//     const cleaned = value.replace(/[^\d+]/g, "");
//     setPhoneNumber(cleaned);
//   };

//   const features = [
//     "Kredit karta talab qilinmaydi",
//     "30 kunlik sinov",
//     "Bekor qilish istalgan vaqtda",
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }

//         .animate-fade-in-scale {
//           animation: fadeInScale 0.8s ease-out forwards;
//         }

//         .btn-shimmer {
//           background: linear-gradient(
//             90deg,
//             #10b981 0%,
//             #059669 40%,
//             #10b981 50%,
//             #059669 60%,
//             #10b981 100%
//           );
//           background-size: 200% auto;
//           transition: all 0.3s ease;
//         }

//         .btn-shimmer:hover {
//           background-position: right center;
//           transform: translateY(-2px);
//           box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.5);
//         }

//         .input-focus {
//           transition: all 0.3s ease;
//         }

//         .input-focus:focus {
//           transform: scale(1.02);
//           box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
//         }

//         .delay-100 { animation-delay: 0.1s; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-300 { animation-delay: 0.3s; }
//         .delay-400 { animation-delay: 0.4s; }
//       `}</style>

//       <div
//         ref={sectionRef}
//         className="bg-[#0a1929] py-24 w-full"
//         id="registration"
//       >
//         {/* <Container> */}
//         <div className="max-w-4xl mx-auto text-center space-y-12">
//           <div
//             className={`space-y-6 ${
//               isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
//             }`}
//           >
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
//               Xavfsizlikni bugundan boshlang
//             </h2>
//             <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Birinchi 200 foydalanuvchi uchun komissiya atigi 1%. Oddiy
//               to'lovdan TASDIQ himoyasiga o'ting.
//             </p>
//           </div>
//           <div
//             className={`flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto ${
//               isVisible
//                 ? "animate-fade-in-scale opacity-0 delay-200"
//                 : "opacity-0"
//             }`}
//           >
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={handlePhoneChange}
//               placeholder="+998 90 123 45 67"
//               className="input-focus flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
//             />

//             <button className="btn-shimmer flex items-center justify-center space-x-2 px-8 py-4 text-white text-lg font-bold rounded-xl">
//               <span>Ro'yxatdan o'tish</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//           <div
//             className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-300 ${
//               isVisible ? "animate-fade-in-up opacity-0 delay-400" : "opacity-0"
//             }`}
//           >
//             {features.map((feature, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
//                 <span className="text-sm md:text-base">{feature}</span>
//               </div>
//             ))}
//           </div>
//           {/* <div
//               className={`pt-8 ${
//                 isVisible ? "animate-fade-in-up opacity-0 delay-300" : "opacity-0"
//               }`}
//             >
//               <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-white text-sm font-semibold">
//                     1000+ foydalanuvchi ishonch bildirdi
//                   </span>
//                 </div>
//               </div>
//             </div> */}
//         </div>
//         {/* </Container> */}
//       </div>
//     </>
//   );
// };

// export default CTASection;



import React, { useState, useEffect, useRef } from "react";
import { Check, ArrowRight, X, Phone, Shield } from "lucide-react";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const sectionRef = useRef(null);

  const API_URL = "http://localhost:5000/api";

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
    let interval;
    if (showVerification && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerification, timer]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d+]/g, "");
    setPhoneNumber(cleaned);
    setError("");
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    setError("");
  };

  const sendCode = async () => {
    setError("");
    setSuccess("");

    if (!phoneNumber.match(/^\+998\d{9}$/)) {
      setError("Iltimos, to'g'ri telefon raqam kiriting (+998XXXXXXXXX)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowVerification(true);
        setTimer(60);
        setCanResend(false);
        setSuccess("Tasdiqlash kodi yuborildi! ✅");

        // // Development mode uchun
        // if (data.code) {
        //   console.log("📱 Verification code:", data.code);
        //   alert(`Development mode: Kod - ${data.code}`);
        // }
      } else {
        setError(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Send code error:", err);
      setError(
        "Server bilan bog'lanishda xatolik. Iltimos qayta urinib ko'ring"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setError("");
    setSuccess("");

    if (verificationCode.length !== 6) {
      setError("6 raqamli kodni kiriting");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("🎉 Ro'yxatdan o'tish muvaffaqiyatli!");

        if (data.user) {
          console.log("✅ Foydalanuvchi:", data.user);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("phoneNumber", data.user.phoneNumber);
        }

        setTimeout(() => {
          setShowVerification(false);
          setPhoneNumber("");
          setVerificationCode("");
          setError("");
          setSuccess("");
        }, 2000);
      } else {
        setError(data.message || "Noto'g'ri kod");
      }
    } catch (err) {
      console.error("Verify code error:", err);
      setError(
        "Server bilan bog'lanishda xatolik. Iltimos qayta urinib ko'ring"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setVerificationCode("");
    setError("");
    sendCode();
  };

  const closeModal = () => {
    setShowVerification(false);
    setVerificationCode("");
    setError("");
    setSuccess("");
    setTimer(60);
    setCanResend(false);
  };

  const features = [
    "Kredit karta talab qilinmaydi",
    "30 kunlik sinov",
    "Bekor qilish istalgan vaqtda",
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .btn-shimmer {
          background: linear-gradient(
            90deg,
            #10b981 0%,
            #059669 40%,
            #10b981 50%,
            #059669 60%,
            #10b981 100%
          );
          background-size: 200% auto;
          transition: all 0.3s ease;
        }

        .btn-shimmer:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.5);
        }

        .btn-shimmer:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: scale(1.02);
          box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <div
        ref={sectionRef}
        className="bg-[#0a1929] py-24 w-full"
        id="registration"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12 px-4">
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-in-up opacity-0" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Xavfsizlikni bugundan boshlang
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Birinchi 200 foydalanuvchi uchun komissiya atigi 1%. Oddiy
              to'lovdan TASDIQ himoyasiga o'ting.
            </p>
          </div>

          {!showVerification ? (
            <div
              className={`flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto ${
                isVisible
                  ? "animate-fade-in-scale opacity-0 delay-200"
                  : "opacity-0"
              }`}
            >
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+998 90 123 45 67"
                className="input-focus flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
              />

              <button
                onClick={sendCode}
                disabled={loading}
                className="btn-shimmer flex items-center justify-center space-x-2 px-8 py-4 text-white text-lg font-bold rounded-xl"
              >
                <span>{loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-scale max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Tasdiqlash kodi
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-gray-700 text-sm flex items-center">
                  <Phone className="w-4 h-4 inline mr-2 text-blue-500" />
                  {phoneNumber} raqamiga yuborilgan 6 raqamli kodni kiriting
                </p>
              </div>

              <input
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="000000"
                maxLength={6}
                className="w-full px-6 py-4 text-2xl text-center tracking-widest rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none mb-4"
                autoFocus
              />

              <div className="text-center text-sm text-gray-600 mb-4">
                {timer > 0 ? (
                  <span>
                    Kod <strong className="text-blue-600">{timer}</strong>{" "}
                    soniyadan keyin eskiradi
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={!canResend || loading}
                    className="text-blue-500 hover:text-blue-700 font-semibold disabled:text-gray-400"
                  >
                    Qayta yuborish
                  </button>
                )}
              </div>

              <button
                onClick={verifyCode}
                disabled={loading || verificationCode.length !== 6}
                className="w-full btn-shimmer px-6 py-4 text-white text-lg font-bold rounded-xl"
              >
                {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center">
                <Shield className="w-4 h-4 mr-1" />
                Ma'lumotlaringiz xavfsiz shifrlangan
              </div>
            </div>
          )}

          {error && (
            <div className="animate-fade-in-scale max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="animate-fade-in-scale max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg font-semibold">
              {success}
            </div>
          )}

          <div
            className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-300 ${
              isVisible ? "animate-fade-in-up opacity-0 delay-400" : "opacity-0"
            }`}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CTASection;
