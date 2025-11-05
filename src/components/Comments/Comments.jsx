import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const UserComments = () => {
  const [comment, setComment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("userEmail");

    const newComment = {
      id: Date.now(),
      username: username || "Anonim",
      email: email || "",
      text: comment,
      date: new Date().toISOString()
    };

    const existingComments = JSON.parse(localStorage.getItem("comments") || "[]");
    existingComments.unshift(newComment);
    localStorage.setItem("comments", JSON.stringify(existingComments));

    setComment("");
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-5xl font-bold mb-8 text-gray-800">
          Fikr-mulohaza
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Sizning fikringiz biz uchun muhim!
        </p>

        <div className="bg-gradient-to-br from-violet-100 to-violet-200 py-16 px-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                Fikringizni yozing:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 resize-none border-2 border-violet-200"
                rows="5"
                placeholder="Sizning fikringiz..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              <span>Yuborish</span>
            </button>
          </form>

          {showSuccess && (
            <div className="mt-6 bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl flex items-center justify-center space-x-3 animate-fade-in">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Fikringiz muvaffaqiyatli yuborildi!</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserComments;