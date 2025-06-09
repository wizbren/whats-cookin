import React from "react";
import "../styles/components/_header.scss";

export default function Header({ user }) {
  return (
    <nav className="header">
      {/* LEFT BOX BELOW */}
      <div className="header-section header-left">
        <p className="user-name"> {user} </p>
        <div className="header-buttons">
          <button className="header-btn">Logout</button>
          <button className="header-btn">Favorites</button>
          <button className="header-btn">Clear Prompt</button>
        </div>
      </div>

      {/* MIDDLE BOX BELOW */}
      <div className="header-section header-center">
        <h1 className="project-title">What's Cookin'?</h1>
        <p className="project-credits">
          Created by <br />
          Jesse Miller - Boxin Cao - Brendan Brown
        </p>
      </div>

      {/* RIGHT BOX BELOW (EMPTY) */}
      <div className="header-section header-right">
        {/* KEEP EMPTY FOR FLEXBOX SPACING */}
      </div>
    </nav>
  );
}