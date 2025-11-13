import React from "react";
import { MessageCircle, Bot } from "lucide-react";

const BuildManualCard = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-black h-16 flex items-center px-6">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Build</h1>
          </div>

          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                When to use
              </h2>
              <p className="text-gray-600 text-base">
                Use this manual when a customer asks for a refund
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Manual logic
              </h2>

              <div className="mb-4 flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-purple-600 font-mono text-base font-semibold">
                  /
                </span>
                <span>to reference other manuals and tools</span>
                <div className="ml-auto flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6Z" />
                    </svg>
                    Tools
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2Z" />
                    </svg>
                    Manual
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-gray-900 font-medium">
                  1. Give user refund
                </div>
                <div className="ml-6 flex items-center gap-2 text-gray-700">
                  <span>a. If they are eligible</span>
                  <span className="text-purple-600 font-mono">/</span>
                </div>
              </div>

              <div className="relative inline-block ml-42 -mt-5">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-44">
                  <div className="px-4 py-2.5 text-sm font-medium text-gray-900 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                    Manual
                  </div>
                  <div className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                    <span>Tool</span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 10l5 5 5-5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8">
          <button className="w-10 h-10 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center shadow-md transition-colors">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildManualCard;
