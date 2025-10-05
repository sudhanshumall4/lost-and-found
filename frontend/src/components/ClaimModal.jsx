import { useState } from 'react';

function ClaimModal({ isOpen, onClose, onClaim, itemTitle }) {
  const [formData, setFormData] = useState({
    claimantName: '',
    claimantContact: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number field, only allow digits and limit to 10 characters
    if (name === 'claimantContact') {
      const numericValue = value.replace(/\D/g, ''); // Remove all non-digits
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.claimantName.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!formData.claimantContact.trim()) {
      alert('Please enter your phone number');
      return;
    }
    
    if (formData.claimantContact.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      await onClaim(formData);
      // Reset form and close modal
      setFormData({ claimantName: '', claimantContact: '' });
      onClose();
    } catch (error) {
      console.error('Claim error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ claimantName: '', claimantContact: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-purple-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Claim Item
          </h3>
          <p className="text-purple-600 font-medium">
            "{itemTitle}"
          </p>
          <p className="text-sm text-purple-500 mt-2">
            Please provide your details to claim this item
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="claimantName" className="block text-sm font-semibold text-purple-900 mb-2">
              Your Full Name *
            </label>
            <input
              type="text"
              id="claimantName"
              name="claimantName"
              value={formData.claimantName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="claimantContact" className="block text-sm font-semibold text-purple-900 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="claimantContact"
              name="claimantContact"
              value={formData.claimantContact}
              onChange={handleChange}
              required
              maxLength="10"
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-purple-700">
                <p className="font-semibold mb-1">Important:</p>
                <p>Your phone number will be shared with the item owner for coordination. Please ensure it's accurate.</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-50 hover:border-purple-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Claiming...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Claim Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClaimModal;