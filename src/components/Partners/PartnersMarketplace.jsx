import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PartnersImg from "../../assets/partners.png";

const PartnersMarketplace = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-20 mt-20 overflow-hidden">
      <motion.div
        className="flex-1 flex justify-center -ml-10"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={PartnersImg}
          alt="Marketplace illustration"
          className="max-w-[400px] md:max-w-[430px]"
        />
      </motion.div>

      <motion.div
        className="flex-1 space-y-6 bg-violet-200/80 rounded-3xl py-16 px-10 shadow-lg"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-black leading-snug">
          How we work with our <br /> marketplace partners
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          We deliver customised solutions that meet the unique needs of every
          marketplace and its users. We view marketplaces as true partners and
          prioritise collaboration. From the first meeting through post-launch
          support, we’re with you every step of the way, ensuring a seamless
          integration and long-term success.
        </p>

        <motion.button className="btn-hover flex items-center space-x-2 px-7 py-3 border-2 border-blue-600 bg-blue-600 text-white rounded-xl hover:bg-white hover:text-blue-600 hover:border-blue-700 transition-all duration-300 font-semibold transform">
          <span className="text-lg">Partner With Us</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PartnersMarketplace;
