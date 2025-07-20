 import React from "react";

const RecentActivities = ({ activities }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md">
    <div className="font-bold mb-3">Recent Activities</div>
    <ul>
      {activities.map((act) => (
        <li key={act.id} className="mb-3 flex gap-2 items-center">
          <div className="text-xs bg-yellow-100 px-2 py-1 rounded min-w-16 text-center">{act.date}</div>
          <div className="text-sm">
            {act.link ? (
              <a
                href={act.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 underline hover:text-yellow-900"
              >
                {act.description}
              </a>
            ) : (
              act.description
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivities;