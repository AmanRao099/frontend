import React, { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, onValue } from 'firebase/database';
import './ChatWindow.css';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages
  React.useEffect(() => {
    const messagesRef = ref(database, 'messages/');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
  }, []);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(database, 'messages/');
      push(messagesRef, { text: message, timestamp: Date.now() });
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
