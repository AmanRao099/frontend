import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // To navigate programmatically
import { auth } from '../firebase/firebase'; // Importing Firebase auth for user check
import './CommunicationPage.css';

const CommunicationPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate the user
  const [user, setUser] = useState(null); // Store user info

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/login'); // If no user is authenticated, navigate to login page
      }
      setUser(currentUser); // Update user state if logged in
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [navigate]);

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
      user: user ? user.displayName : 'Anonymous', // Add user name to the message
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
              <strong>{message.user}</strong>: {message.content}
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
