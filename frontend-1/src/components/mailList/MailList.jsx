import React from "react";

import "./mailList.css";

export const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money !</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input placeholder="Your email address"></input>
        <button>Subscribe</button>
      </div>
    </div>
  );
};
