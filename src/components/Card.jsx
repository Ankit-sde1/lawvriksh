 // components/Card.jsx
import React from "react";

const Card = ({ image, title, isSelectable, isSelected, onSelect }) => (
  <div
    className={`
      relative w-64 rounded-xl bg-white shadow-md p-3 flex flex-col hover:scale-105 transition
      ${isSelectable ? "cursor-pointer border-2 " + (isSelected ? "border-red-500" : "border-yellow-200") : ""}
    `}
    onClick={isSelectable ? onSelect : undefined}
  >
    <div className="h-28 flex items-center justify-center bg-yellow-50 rounded-xl mb-4">
      {image.startsWith("data") ? (
        <img src={image} className="w-full h-full object-cover rounded-xl" alt="" />
      ) : (
        <span className="text-3xl font-bold text-yellow-600">{image}</span>
      )}
    </div>
    <div className="font-semibold">{title}</div>
    <div className="text-xs text-gray-500 mt-1">2025 · 7 min read</div>
  </div>
);

export default Card;