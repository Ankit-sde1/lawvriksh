 import React from "react";

const links = [
  {
    name: "Facebook",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M18 2h-3a6 6 0 00-6 6v3H6v4h3v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"/>
      </svg>
    ),
    href: "",
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1.5"/>
      </svg>
    ),
    href: "",
  },
  {
    name: "Twitter",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M8 19c11 0 14-9 14-14v-1A9.97 9.97 0 0022 3a9.7 9.7 0 01-2.828.775A4.872 4.872 0 0021.447 1.92a9.725 9.725 0 01-3.076 1.175A4.848 4.848 0 0016.616 1C13.638 1 11 3.592 11 6.641c0 .52.059 1.032.17 1.519C7.691 7.98 4.256 6.13 1.987 3.359c-.573.983-.902 2.133-.902 3.371 0 2.325 1.18 4.377 3.038 5.581a4.841 4.841 0 01-2.212-.611v.061c0 3.244 2.309 5.949 5.377 6.559-.562.148-1.154.228-1.765.228-.432 0-.85-.041-1.262-.117C2.835 19.79 6.12 21 9.738 21c11.248 0 17.412-9.307 17.412-17.382 0-.265-.007-.526-.02-.788A12.486 12.486 0 0024 1.65c-.881.39-1.829.648-2.825.759A6.79 6.79 0 0021.447 0"/>
      </svg>
    ),
    href: "",
  },
  {
    name: "Mail",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    ),
    href: "",
  },
];

const SocialLinks = () => (
  <div className="flex space-x-4 mt-4 mb-2">
    {links.map((link, idx) => (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        key={idx}
        className="hover:bg-yellow-100 rounded-full p-2"
        title={link.name}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

export default SocialLinks;