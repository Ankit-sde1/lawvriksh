import React from "react";

const Contact = React.forwardRef((props, ref) => (
  <section ref={ref} className="bg-white rounded-2xl p-6 shadow-md mt-12" id="contact-section">
    <h3 className="font-bold text-xl mb-4">Contact</h3>
    <ul className="space-y-2 text-[#3b2d17]">
      <li>
        <span className="font-medium">Name:</span> Ankit Raj
      </li>
      <li>
        <span className="font-medium">Email:</span> Ankitraj123@gmail.com
      </li>
      <li>
        <span className="font-medium">Mobile:</span> +0123456789
      </li>
    </ul>
  </section>
));

export default Contact;
