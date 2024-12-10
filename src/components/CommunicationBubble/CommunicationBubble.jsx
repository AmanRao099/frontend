import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunicationBubble.css';

const CommunicationBubble = () => {
  const navigate = useNavigate();

  return (
    <div
      className="communication-bubble"
      title="Chat and Communication"
      onClick={() => navigate('/communication')}
    >
      <div className="communication-bubble-icon">💬</div>
    </div>
  );
};

export default CommunicationBubble;
