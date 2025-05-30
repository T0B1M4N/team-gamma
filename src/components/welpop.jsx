import React, { useEffect, useState } from "react";
import "../WelcomePopup.css";

function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false); // initially false
  const [checkedStorage, setCheckedStorage] = useState(false); // control check timing

  useEffect(() => {
    const shownBefore = sessionStorage.getItem("welcome_shown");

    if (!shownBefore) {
      setShowPopup(true); // show popup
      sessionStorage.setItem("welcome_shown", "true");
    }

    setCheckedStorage(true); // prevent flicker
  }, []);

  if (!checkedStorage || !showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p style={{color:"black"}}>👋 Welcome to the Gamma Store!</p>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </div>
    </div>
  );
}

export default WelcomePopup;
