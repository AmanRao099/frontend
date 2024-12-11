import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)}>X</button>
    </div>
  );
};

export default Notification;