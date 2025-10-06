import axios from "axios";
import { useEffect, useState } from "react";
import ClaimModal from "../components/ClaimModal";

function PublicList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimModal, setClaimModal] = useState({ isOpen: false, item: null });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get("http://localhost:3000/api/items")
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const openClaimModal = (item) => {
    setClaimModal({ isOpen: true, item });
  };

  const closeClaimModal = () => {
    setClaimModal({ isOpen: false, item: null });
  };

  const handleClaim = async (claimantData) => {
    try {
      await axios.patch(`http://localhost:3000/api/items/${claimModal.item._id}/claim`, {
        claimantName: claimantData.claimantName,
        claimantContact: claimantData.claimantContact,
        claimantId: "anonymous"
      });
      alert("Item claimed successfully!");
      fetchItems(); // Refresh the list to reflect the new "Claimed" status.
    } catch (error) {
      console.error("Error claiming item:", error);
      alert(error.response?.data?.message || "Failed to claim item. Please try again.");
      throw error; // Re-throw to let modal handle loading state
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-xl text-purple-600 font-semibold py-16">
          Loading items...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
          Available Items
        </h2>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-16 text-purple-600">
          <svg className="w-16 h-16 mx-auto mb-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">No items yet</h3>
          <p>Check back later for new lost and found items</p>
        </div>
      ) : (
        /* Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h4 className="text-xl font-bold text-purple-900 flex-1">
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

              {/* Description */}
              <p className="text-purple-700 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-purple-200">
                {/* Date */}
                <div className="flex items-center gap-2 text-purple-600 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {new Date(item.dateReported).toLocaleDateString()}
                  </span>
                </div>

                {/* Claim Button or Status */}
                {item.type === "lost" && item.status !== "Claimed" && (
                  <button
                    onClick={() => openClaimModal(item)}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Claim
                  </button>
                )}
                {/* NO CHANGE: This logic correctly displays the "Claimed" status. */}
                {item.status === "Claimed" && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Claimed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Claim Modal */}
      <ClaimModal 
        isOpen={claimModal.isOpen}
        onClose={closeClaimModal}
        onClaim={handleClaim}
        itemTitle={claimModal.item?.title}
      />
    </div>
  );
}

export default PublicList;