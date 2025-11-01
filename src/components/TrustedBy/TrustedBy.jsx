import React from "react";
import LogoTrust1 from "../../assets/logo_trust/logo_trust_1.png";
import LogoTrust2 from "../../assets/logo_trust/logo_trust_2.png";
import LogoTrust3 from "../../assets/logo_trust/logo_trust_3.png";
import LogoTrust4 from "../../assets/logo_trust/logo_trust_4.png";
import LogoTrust5 from "../../assets/logo_trust/logo_trust_5.png";
import LogoTrust6 from "../../assets/logo_trust/logo_trust_6.png";

export default function TrustedBySection() {
  const logos = [
    {
      src: LogoTrust1,
      alt: "Fensa",
      width: "115px",
      opacity: "opacity-70",
    },
    {
      src: LogoTrust2,
      alt: "Racemarket",
      width: "200px",
      opacity: "opacity-65",
    },
    {
      src: LogoTrust3,
      alt: "Your Bazar",
      width: "140px",
      opacity: "opacity-75",
    },
    {
      src: LogoTrust4,
      alt: "MojeKrpice",
      width: "210px",
      opacity: "opacity-70",
    },
    {
      src: LogoTrust5,
      alt: "Students24",
      width: "95px",
      opacity: "opacity-68",
    },
    {
      src: LogoTrust6,
      alt: "Mudah.my",
      width: "210px",
      opacity: "opacity-72",
    },
  ];

  return (
    <div className="w-full bg-white py-16 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-medium text-center text-black mb-16">
        Trusted by
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex items-center logo-slider">
          <div className="flex logo-track">
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16 flex items-center justify-center logo-item"
                style={{ width: logo.width }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`w-full h-auto ${logo.opacity} hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            ))}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16 flex items-center justify-center logo-item"
                style={{ width: logo.width }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`w-full h-auto ${logo.opacity} hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .logo-slider {
          width: 100%;
        }

        .logo-track {
          display: flex;
          width: fit-content;
          animation: scroll 35s linear infinite;
        }

        // .logo-track:hover {
        //   animation-play-state: paused;
        // }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
