import React, { useState, useEffect } from "react";
import { MessageSquare, User, Calendar, Trash2 } from "lucide-react";

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(savedComments);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Comments</h2>
        <p className="text-gray-600">Foydalanuvchilardan kelgan barcha fikrlar</p>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Hali fikrlar yo'q
          </h3>
          <p className="text-gray-500">
            Foydalanuvchilar fikr qoldirganda bu yerda ko'rinadi
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Jami fikrlar: <span className="text-blue-600">{comments.length}</span>
            </h3>
          </div>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {comment.username}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(comment.date)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                  title="O'chirish"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">{comment.text}</p>
              </div>

              {comment.email && (
                <div className="mt-3 text-sm text-gray-500">
                  Email: <span className="text-gray-700">{comment.email}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;