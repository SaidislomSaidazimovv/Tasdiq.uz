import React from "react";
import {
  Banknote,
  Building2,
  ShieldCheck,
  Key,
  Link,
  CreditCard,
  Fingerprint,
  FileText,
  IndianRupee,
  Cog,
  Shield,
} from "lucide-react";

const B2BPayments = () => {
  return (
    <section className="bg-white py-20 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#0a3a3e] mb-14">
        B2B payments made more efficient, <br /> secure and convenient.
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        <div className="flex flex-col gap-4 text-[#0a3a3e] w-full lg:w-1/3 mr-30 -ml-30">
          <div className="text-xl font-semibold mb-3">Pay-in</div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <ShieldCheck className="text-[#0a3a3e]" size={22} />
              <span>UPI in 6+ Banks</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <CreditCard className="text-[#0a3a3e]" size={22} />
              <span>10 + Payment Gateways</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <Building2 className="text-[#0a3a3e]" size={22} />
              <span>Current Account in 15+ Banks</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <Banknote className="text-[#0a3a3e]" size={22} />
              <span>Escrow Account in 15+ Banks</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <Link className="text-[#0a3a3e]" size={22} />
              <span>Connected Banking</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <Key className="text-[#0a3a3e]" size={22} />
              <span>eNACH</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
              <Fingerprint className="text-[#0a3a3e]" size={22} />
              <span>Digital Identifiers</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-[320px] h-[320px] bg-[#0a9a9e] text-white rounded-full text-center shadow-xl">
          <h3 className="font-semibold text-lg">SOURCE & PAYEE VALIDATION</h3>
          <p className="text-sm mt-2 opacity-80">
            Secure verification of counterparties
          </p>

          <div className="absolute top-[-80px]">
            <ShieldCheck
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
          <div className="absolute left-[-60px] top-[30px]">
            <Shield
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
          <div className="absolute right-[-60px] top-[30px]">
            <FileText
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
          <div className="absolute bottom-[-80px]">
            <IndianRupee
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
          <div className="absolute top-[240px] left-[-60px] transform -translate-y-1/2">
            <Cog
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
          <div className="absolute top-[240px] right-[-60px] transform -translate-y-1/2">
            <Fingerprint
              size={55}
              className="bg-[#0a3a3e] p-2 text-white opacity-90 rounded-4xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 text-[#0a3a3e] w-full lg:w-1/3 ml-30 -mr-35">
          <div className="text-xl font-semibold mb-3">Pay-out</div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-6 space-y-4">
            <div className="border border-gray-200 rounded-lg p-3 text-center font-medium">
              <span className="text-[#0a3a3e] font-semibold">UPI</span>
              <div className="text-xs opacity-70">
                Unified Payments Interface
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 text-center font-medium">
              <span className="text-[#0a3a3e] font-semibold">IMPS</span>
              <div className="text-xs opacity-70">
                Immediate Payment Service
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="border border-gray-200 rounded-lg p-3 text-center w-[45%] font-medium">
                <div className="text-[#0a3a3e] font-semibold">RTGS</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-center w-[45%] font-medium">
                <div className="text-[#0a3a3e] font-semibold">NEFT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BPayments;
