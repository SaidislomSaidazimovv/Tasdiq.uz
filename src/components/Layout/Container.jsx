import React from "react";

const Container = ({ children, className = "", size = "default" }) => {
  const sizeClasses = {
    small: "max-w-4xl",
    default: "max-w-[1400px]",
    large: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <div
      className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
