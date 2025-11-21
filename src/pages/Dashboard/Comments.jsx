import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  User,
  Calendar,
  Trash2,
  Mail,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    const sortedComments = savedComments.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setComments(sortedComments);
    calculateStats(sortedComments);
  };

  const calculateStats = (commentsList) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = commentsList.filter(
      (c) => new Date(c.date) >= today
    ).length;

    const weekCount = commentsList.filter(
      (c) => new Date(c.date) >= weekAgo
    ).length;

    setStats({
      total: commentsList.length,
      today: todayCount,
      thisWeek: weekCount,
    });
  };

  const deleteComment = (id) => {
    if (window.confirm("Haqiqatan ham bu fikrni o'chirmoqchimisiz?")) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      setComments(updatedComments);
      calculateStats(updatedComments);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Bugun, ${date.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    if (diffDays === 1) {
      return `Kecha, ${date.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return date.toLocaleString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <MessageSquare className="w-10 h-10 text-blue-600" />
          Foydalanuvchi Fikrlari
        </h2>
        <p className="text-gray-600 text-lg">
          Barcha foydalanuvchilardan kelgan fikrlar va statistika
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">
                Jami Fikrlar
              </p>
              <h3 className="text-4xl font-bold">{stats.total}</h3>
            </div>
            <MessageCircle className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Bugun</p>
              <h3 className="text-4xl font-bold">{stats.today}</h3>
            </div>
            <Calendar className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                Bu Hafta
              </p>
              <h3 className="text-4xl font-bold">{stats.thisWeek}</h3>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Hali fikrlar yo'q
          </h3>
          <p className="text-gray-500 text-lg">
            Foydalanuvchilar fikr qoldirganda bu yerda ko'rinadi
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-xl mb-1">
                        {comment.username}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(comment.date)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                    title="O'chirish"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 mb-4">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {comment.text}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  {comment.email && (
                    <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-gray-600 font-medium">Email:</span>
                      <span className="ml-2 text-gray-800">
                        {comment.email}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center bg-purple-50 px-4 py-2 rounded-lg">
                    <MessageCircle className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600 font-medium">Fikr #</span>
                    <span className="ml-2 text-gray-800">
                      {comments.length - index}
                    </span>
                  </div>

                  <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                    <span className="text-gray-600 font-medium">ID:</span>
                    <span className="ml-2 text-gray-800 font-mono text-xs">
                      {comment.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
