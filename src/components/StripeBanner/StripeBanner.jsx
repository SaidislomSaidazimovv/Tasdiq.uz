export default function StripePartnerBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-17 px-12 rounded-se-4xl rounded-tl-4xl mt-20">
      <div className="mx-auto flex items-center gap-6">
        <div className="flex-shrink-0 bg-white rounded-lg px-6 py-3 flex items-center gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-2xl">stripe</span>
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="text-gray-800 font-semibold text-lg">
              Verified Partner
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-white text-lg leading-relaxed">
            Partnering with Stripe enables Trustap to offer users world-class
            security and ensures all payments and data are fully protected. For
            more information on our partnership with Stripe,{" "}
            <a
              href="#"
              className="underline hover:text-blue-100 transition-colors font-medium"
            >
              click here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
