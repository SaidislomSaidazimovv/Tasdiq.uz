import React, { useRef, useState } from "react";
import {
  FileCheck,
  DollarSign,
  Package,
  ArrowRight,
  Shield,
  CheckCircle,
  Users,
  CreditCard,
  Lock,
  ArrowLeft,
} from "lucide-react";

const TransactionStepsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

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
    <div className="mx-auto">
      <div
        ref={scrollContainerRef}
        className="flex gap-16 overflow-x-hidden pb-8 scroll-smooth px-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[calc(33.333%-21.33px)] bg-white rounded-3xl border-2 border-gray-200 p-12"
            style={{ minWidth: "350px", scrollSnapAlign: "start" }}
          >
            <div className="mb-6">{step.icon}</div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
              {step.title}
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-0 mt-8">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors mr-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}

        <div className="flex gap-0">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 transition-all duration-300 ${
                index === currentIndex ? "w-96 bg-blue-600" : "w-96 bg-gray-300"
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

        {currentIndex < totalGroups - 1 && (
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors ml-2"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all">
          <span>Learn more</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TransactionStepsSection;
