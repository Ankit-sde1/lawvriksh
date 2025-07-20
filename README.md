 A modern legal diary app to chronologically record and visualize case entries with smooth UI transitions.

🔗 Live Demo
https://lawvriksh-nine.vercel.app

📦 Tech Stack
Frontend: React + Vite

Styling: Tailwind CSS

State Management: React useState & useEffect

Animation: Framer Motion

Deployment: Vercel

⚙️ Setup & Run Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/lawvriksh.git
cd lawvriksh
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Build for production:

bash
Copy
Edit
npm run build
Preview production build:

bash
Copy
Edit
npm run preview
🧠 State Management Approach
We used React hooks (useState, useEffect) for lightweight and efficient state management.

🔧 State Structure
Global Entry State:

js
Copy
Edit
const [entries, setEntries] = useState([]);
Stored as an array of objects:

js
Copy
Edit
[
  {
    id: uuid(),
    title: "Case Name",
    date: "2025-07-20",
    description: "Case details here",
    ...
  }
]
Local Storage Sync:

On initial load, we hydrate entries from localStorage.

Every state update persists to localStorage for persistence across sessions.

🧩 Component Structure
less
Copy
Edit
src/
│
├── components/
│   ├── EntryForm.jsx        // Form to create a new diary entry
│   ├── EntryList.jsx        // Renders the sorted list of entries
│   ├── EntryCard.jsx        // Individual card view with animation
│   └── Header.jsx           // App branding and navigation
│
├── utils/
│   └── storage.js           // Local storage helpers
│
├── App.jsx                  // Root component with state logic
└── main.jsx                 // Entry point
🧩 Insertion Logic (Chronological Ordering)
Every new entry is pushed to the entries array.

The list is immediately sorted in ascending chronological order by date:

js
Copy
Edit
const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
This ensures new entries are always placed appropriately in the timeline, not just at the end.

🎞️ Animation Techniques
We use Framer Motion to animate entry cards during:

Mounting (fade/slide-in):

jsx
Copy
Edit
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  ...
</motion.div>
Removal (fade-out):
Animated exit using AnimatePresence.

This gives the app a modern, dynamic feel, especially as entries are added/removed.

📚 Future Improvements
Drag-and-drop reordering

Search/filter by case title or date

Backend sync with Firebase or Supabase
