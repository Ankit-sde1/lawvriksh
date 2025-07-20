import React, { useState, useRef } from "react";
import Card from "./Card";

const CardList = ({ category, cards, onAddCard }) => {
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [desc, setDesc] = useState("");
  const imgInput = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setNewImage(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newImage || !desc) return;
    onAddCard({
      id: Date.now(),
      image: newImage,
      title: desc,
      category,
    });
    setDesc("");
    setNewImage("");
    setShowModal(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">{category}</h3>
        <button 
          className="text-xs px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200"
          onClick={() => setShowModal(true)}
        >
          Add new card
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {cards.map(card => (<Card key={card.id} image={card.image} title={card.title} />))}
      </div>
      {showModal && (
        <form
          className="fixed z-20 bg-white shadow-xl rounded-lg p-6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2">Card Image</label>
            {newImage && <img src={newImage} className="w-32 h-20 mb-2 object-cover rounded" />}
            <input type="file" accept="image/*" ref={imgInput} onChange={handleImageChange} />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Description</label>
            <textarea
              className="border rounded w-full p-2"
              placeholder="Write something about card"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button className="mr-2" type="button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="bg-yellow-500 text-white px-4 py-1 rounded" type="submit">Add</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CardList;
