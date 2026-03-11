import { useState } from "react";
import { THEORY_LESSONS } from "../data/theory";

export default function TheoryLessons() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="theory-lessons">
      <p className="theory-intro">
        Bite-sized music theory that actually makes sense. No fluff, just what you need to understand the songs you're learning.
      </p>

      {THEORY_LESSONS.map((lesson) => {
        const isOpen = openId === lesson.id;
        return (
          <div
            key={lesson.id}
            className={`theory-card ${isOpen ? "open" : ""}`}
            onClick={() => setOpenId(isOpen ? null : lesson.id)}
          >
            <div className="theory-card-header">
              <span className="theory-card-title">{lesson.title}</span>
              <span className={`theory-chevron ${isOpen ? "rotated" : ""}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 4.5l3 3 3-3" />
                </svg>
              </span>
            </div>
            {isOpen && (
              <div className="theory-card-body">
                {lesson.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
