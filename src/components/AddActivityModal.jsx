import React, { useState } from "react";

export default function AddActivityModal({ onClose, onAdd }) {
  const today = new Date().toISOString().split("T")[0];
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    onAdd({
      id: Date.now(),
      date: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: 'numeric' }),
      description: title,
      link: link.trim()
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm mx-auto p-6 rounded-lg shadow-lg relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="mb-4 text-lg font-bold">Add Activity</h2>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Activity Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            maxLength="120"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Link <span className="text-gray-400">(optional, URL)</span></label>
          <input
            type="url"
            className="border p-2 w-full rounded"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Add Activity
          </button>
        </div>
      </form>
    </div>
  );
}
