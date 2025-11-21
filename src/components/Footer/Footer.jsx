import React from "react";
import Container from "../../Layout/Container";
import { Check } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    mahsulot: [
      { name: "Qanday ishlaydi", href: "#" },
      { name: "Narxlar", href: "#" },
      { name: "Xavfsizlik", href: "#" },
      { name: "API", href: "#" },
    ],
    kompaniya: [
      { name: "Biz haqimizda", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Hamkorlar", href: "#" },
      { name: "Karyera", href: "#" },
    ],
    yordam: [
      { name: "Qo'llanma", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Bog'lanish", href: "#" },
      { name: "Status", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#0a1929] text-gray-300">
      <Container size="default">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">TASDIQ</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                O'zbekistonda birinchi raqamli ishonch platformasi. Xavfsiz
                to'lovlar uchun.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg mb-6">
                Mahsulot
              </h4>
              <ul className="space-y-3">
                {footerLinks.mahsulot.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg mb-6">
                Kompaniya
              </h4>
              <ul className="space-y-3">
                {footerLinks.kompaniya.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg mb-6">Yordam</h4>
              <ul className="space-y-3">
                {footerLinks.yordam.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-base">
                © 2025 TASDIQ. Barcha huquqlar himoyalangan.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base transition-colors duration-300"
                >
                  Maxfiylik siyosati
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base transition-colors duration-300"
                >
                  Foydalanish shartlari
                </a>
                <div className="flex items-center space-x-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-base font-semibold">
                    Bank litsenziyasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
