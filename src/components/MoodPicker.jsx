import React from "react";
import { MOODS } from "../util/constants.js";

export default function MoodPicker({ mood, setMood }) {
  return (
    <div className="mood-section">
      <label className="input-label">What's your vibe? </label>
      <div className="mood-buttons">
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`mood-btn ${mood === m.id ? 'active' : ''}`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}