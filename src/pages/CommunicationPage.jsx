import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, onValue } from 'firebase/database';
import './CommunicationPage.css';

const CommunicationPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      content: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage('');
  };

  return (
    <div className="communication-page">
      <h1>Chat with Service Providers</h1>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message.content}
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationPage;
