import axios from "axios";
import { useEffect, useState } from "react";

function Moderator() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    // FIX: The backend server is running on port 3000, not 5000.
    // The URL has been updated to point to the correct port.
    axios.get("http://localhost:3000/api/items/pending")
      .then(res => {
        setPending(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleStatus = async (id, status) => {
    try {
      // FIX: The backend server is running on port 3000, not 5000.
      // The URL has been updated to point to the correct port.
      await axios.patch(`http://localhost:3000/api/items/${id}/status`, { status });
      alert(`Item ${status}!`);
      setPending(pending.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center text-xl text-purple-600 font-semibold py-16">
          Loading pending items...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl mb-4 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
          Moderator Dashboard
        </h2>
        <p className="text-purple-600 text-lg font-medium">
          Review and approve pending items
        </p>
      </div>

      {/* Empty State */}
      {pending.length === 0 ? (
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl shadow-xl p-12 border border-purple-100 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-purple-900 mb-2">All caught up!</h3>
          <p className="text-purple-600">No pending items to review at the moment</p>
        </div>
      ) : (
        /* Items List */
        <div className="space-y-6">
          {pending.map(item => (
            <div 
              key={item._id} 
              className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl shadow-xl p-6 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300"
            >
              {/* Item Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-bold text-purple-900">
                      {item.title}
                    </h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${
                      item.type === 'lost' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}>
                      {item.type === 'lost' ? '🔍' : '✨'} {item.type}
                    </span>
                  </div>
                  
                  <p className="text-purple-700 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-purple-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {new Date(item.dateReported).toLocaleDateString()}
                  </span>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  Pending Approval
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-purple-200">
                <button 
                  onClick={() => handleStatus(item._id, "Approved")}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approve
                </button>
                
                <button 
                  onClick={() => handleStatus(item._id, "Rejected")}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      {pending.length > 0 && (
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
          <p className="text-xs text-purple-700 text-center font-medium flex items-center justify-center">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pending.length} item{pending.length !== 1 ? 's' : ''} awaiting review
          </p>
        </div>
      )}
    </div>
  );
}

export default Moderator;