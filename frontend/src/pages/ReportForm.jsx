import { useState } from "react";
import axios from "axios";

function ReportForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lost",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/items", formData);
      alert("Item submitted for approval!");
      // Clear form after successful submission
      setFormData({
        title: "",
        description: "",
        type: "lost",
      });
    } catch (error) {
      console.error('Error submitting item:', error);
      alert('Failed to submit item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Item</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Title
              </label>
              <input
                type="text"
                placeholder="e.g., Black Wallet, iPhone 13"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Provide details about the item, location, and any distinguishing features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Type Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Status
              </label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none cursor-pointer"
                >
                  <option value="lost">🔍 Lost Item</option>
                  <option value="found">✨ Found Item</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-lg hover:shadow-xl"
            >
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportForm;   