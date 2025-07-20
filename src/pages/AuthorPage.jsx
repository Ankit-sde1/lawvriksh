 // pages/AuthorPage.jsx
import React, { useRef, useState, useEffect } from "react";
import Profile from "../components/Profile";
import CardList from "../components/CardList";
import RecentActivities from "../components/RecentActivities";
import SocialLinks from "../components/SocialLinks";
import AddActivityModal from "../components/AddActivityModal";
import Contact from "../components/Contact";

const initialCards = [
  { id: 1, title: "Understanding the role of AI in software development", category: "Corporate Law", image: "card1" },
  { id: 2, title: "Understanding the role of AI in software development", category: "Corporate Law", image: "card2" },
  { id: 3, title: "Understanding the role of AI in software development", category: "Corporate Law", image: "card3" },
  { id: 4, title: "Understanding the role of AI in software development", category: "Constitutional Law", image: "card4" },
  { id: 5, title: "Understanding the role of AI in software development", category: "Constitutional Law", image: "card5" },
  { id: 6, title: "Understanding the role of AI in software development", category: "Constitutional Law", image: "card6" },
];

const initialActivities = [
  { id: 1, date: "19 Jul 2024", description: "Added a new card to Corporate Law" },
  { id: 2, date: "18 Jul 2024", description: "Added a new recent activity" },
];

function parseLocalStorageArray(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function insertChronological(arr) {
  return [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function AuthorPage() {
  const [cards, setCards] = useState([]);
  const [activities, setActivities] = useState([]);
  const [profilePic, setProfilePic] = useState("profilepic");
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeTab, setActiveTab] = useState(""); // "" = Home, "Recent", "Trending", "About"
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setCards(parseLocalStorageArray("cards", initialCards));
    setActivities(parseLocalStorageArray("activities", initialActivities));
    setProfilePic(localStorage.getItem("profilePic") || "profilepic");
  }, []);

  const handleProfilePicUpdate = (newPic) => {
    setProfilePic(newPic);
    localStorage.setItem("profilePic", newPic);
    setActivities(prev => {
      const updated = insertChronological([
        ...prev,
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          description: "Updated profile picture",
        }
      ]);
      localStorage.setItem("activities", JSON.stringify(updated));
      return updated;
    });
  };

  const addCard = (card) => {
    setCards(prev => {
      const updated = [...prev, card];
      localStorage.setItem("cards", JSON.stringify(updated));
      return updated;
    });
    setActivities(prev => {
      const updated = insertChronological([
        ...prev,
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          description: `Added a new card to ${card.category}`,
        }
      ]);
      localStorage.setItem("activities", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCard = (cardId) => {
    setCards(prev => {
      const updated = prev.filter(card => card.id !== cardId);
      localStorage.setItem("cards", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddActivity = (activity) => {
    setActivities(prev => {
      const updated = insertChronological([...prev, activity]);
      localStorage.setItem("activities", JSON.stringify(updated));
      return updated;
    });
    setShowActivityModal(false);
  };

  // CardList rendering logic depending on tabs
  let cardLists = null;
  if (activeTab === "") {
    cardLists = (
      <>
        <CardList
          category="Corporate Law"
          cards={cards.filter(c => c.category === "Corporate Law")}
          onAddCard={addCard}
          selectionMode={selectionMode}
          selectedCardId={selectedCardId}
          onSelectCard={setSelectedCardId}
        />
        <CardList
          category="Constitutional Law"
          cards={cards.filter(c => c.category === "Constitutional Law")}
          onAddCard={addCard}
          selectionMode={selectionMode}
          selectedCardId={selectedCardId}
          onSelectCard={setSelectedCardId}
        />
      </>
    );
  } else if (activeTab === "Recent") {
    cardLists = (
      <CardList
        category="Latest Added"
        cards={cards.length ? [cards[cards.length - 1]] : []}
        onAddCard={addCard}
        selectionMode={selectionMode}
        selectedCardId={selectedCardId}
        onSelectCard={setSelectedCardId}
      />
    );
  } else if (activeTab === "Trending") {
    cardLists = (
      <>
        <CardList
          category="Corporate Law"
          cards={cards.filter(c => c.category === "Corporate Law")}
          onAddCard={addCard}
          selectionMode={selectionMode}
          selectedCardId={selectedCardId}
          onSelectCard={setSelectedCardId}
        />
        <CardList
          category="Constitutional Law"
          cards={cards.filter(c => c.category === "Constitutional Law")}
          onAddCard={addCard}
          selectionMode={selectionMode}
          selectedCardId={selectedCardId}
          onSelectCard={setSelectedCardId}
        />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">🦁 Lawerly</div>
        <nav className="space-x-8 text-md font-medium">
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a
            href="#contact-section"
            onClick={e => {
              e.preventDefault();
              contactRef.current?.scrollIntoView({ behavior: "smooth" });
            }}>
            Contact us
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button aria-label="Search">
            <svg className="w-6 h-6 text-gray-700 hover:text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button aria-label="Notifications">
            <svg className="w-6 h-6 text-gray-700 hover:text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button aria-label="Profile">
            <svg className="w-7 h-7 text-gray-700 hover:text-yellow-600 rounded-full border-2 border-yellow-200 p-1"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2" />
            </svg>
          </button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-10">
        <main className="flex-1">
          <section className="mb-6">
            <h2 className="text-xl font-bold">Robert Fox’s Page</h2>
            <p className="mt-1 text-gray-700 text-sm">
              An author is a creator of written works, such as books, articles, or stories, who uses words to inform, entertain, or inspire readers. They often draw from imagination.
            </p>
            <SocialLinks />
            <div className="flex flex-row gap-4 mb-7 mt-4">
              <button
                className={`px-4 py-2 rounded-full font-medium ${activeTab === "" ? "bg-yellow-300" : "bg-gray-100"}`}
                onClick={() => { setActiveTab(""); setSelectionMode(false); setSelectedCardId(null); }}
              >Home</button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${activeTab === "Recent" ? "bg-yellow-300" : "bg-gray-100"}`}
                onClick={() => { setActiveTab("Recent"); setSelectionMode(false); setSelectedCardId(null); }}
              >Recent</button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${activeTab === "Trending" ? "bg-yellow-300" : "bg-gray-100"}`}
                onClick={() => { setActiveTab("Trending"); setSelectionMode(false); setSelectedCardId(null); }}
              >Trending</button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${activeTab === "About" ? "bg-yellow-300" : "bg-gray-100"}`}
                onClick={() => {
                  setActiveTab("About");
                  setSelectionMode(false);
                  setSelectedCardId(null);
                  contactRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >About</button>
            </div>
            {!selectionMode && (activeTab !== "About") && (
              <button
                onClick={() => { setSelectionMode(true); setSelectedCardId(null); }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold shadow mb-6"
              >
                Delete Card
              </button>
            )}
            {selectionMode && (
              <div className="flex gap-2 mb-6">
                <button
                  disabled={!selectedCardId}
                  onClick={() => {
                    if (selectedCardId) {
                      deleteCard(selectedCardId);
                      setSelectionMode(false);
                      setSelectedCardId(null);
                    }
                  }}
                  className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedCardId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => {
                    setSelectionMode(false);
                    setSelectedCardId(null);
                  }}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>
          {/* Card Sections */}
          {activeTab !== "About" && cardLists}
        </main>
        <aside className="w-full max-w-sm">
          <Profile profilePic={profilePic} setProfilePic={handleProfilePicUpdate} />
          <button
            onClick={() => setShowActivityModal(true)}
            className="w-full mb-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold shadow transition"
          >
            Add Activity
          </button>
          {showActivityModal && (
            <AddActivityModal
              onClose={() => setShowActivityModal(false)}
              onAdd={handleAddActivity}
            />
          )}
          <RecentActivities activities={activities} />
        </aside>
      </div>
      <Contact ref={contactRef} />
    </div>
  );
}