import React from "react";
import "./Clock.css";

interface ClockProps {
  timer?: string | null;
  label?: string | null;
}

const Clock = ({ timer, label }: ClockProps) => {
  return (
    <div className="Clock">
      <span className="Clock__timer">{timer}</span>
      <span className="Clock__label">{label}</span>
    </div>
  );
};

export default Clock;
