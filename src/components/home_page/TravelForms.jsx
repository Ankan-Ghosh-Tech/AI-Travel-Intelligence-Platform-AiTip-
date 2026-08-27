import { useState } from "react";

export default function TravelForms({ mode, travelType }) {
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "Medium",
    vibe: "Relaxing",
    interests: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting query for:", { mode, travelType, ...formData });
    alert(`Searching plans for ${travelType}... Check console for details.`);
  };

  if (mode === "destination") {
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Plan Your {travelType} Trip
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Where are you going?
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Kyoto, Paris, Bali"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trip Duration (Days)
          </label>
          <input
            type="number"
            min="1"
            required
            placeholder="e.g. 5"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Generate Itinerary
        </button>
      </form>
    );
  }

  if (mode === "suggestion") {
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Get {travelType} Recommendations
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Vibe
          </label>
          <select
            value={formData.vibe}
            onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="Relaxing">Relaxing & Peaceful</option>
            <option value="Adventure">Adventure & Outdoors</option>
            <option value="Cultural">Cultural & Historical</option>
            <option value="Nightlife">Nightlife & Social</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget Level
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="Budget">Budget Friendly</option>
            <option value="Medium">Moderate / Standard</option>
            <option value="Luxury">Luxury & Premium</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Get AI Suggestions
        </button>
      </form>
    );
  }

  return null;
}