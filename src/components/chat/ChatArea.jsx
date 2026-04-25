import React, { useRef, useEffect } from 'react';
import useChatStore from '../../store/useChatStore';
import MarkdownRenderer from '../common/MarkdownRenderer';
import './ChatArea.css';

const ChatArea = () => {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="welcome-screen">
          <h1 className="welcome-title">
            Hello, user
          </h1>
          <p className="welcome-subtitle">How can I help you today?</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-item">
              <div 
                className="avatar" 
                style={{ backgroundColor: msg.role === 'user' ? '#3b82f6' : '#22c55e' }} 
              />
              <div className="message-content">
                {msg.role === 'user' ? msg.content : <MarkdownRenderer content={msg.content} />}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-item">
              <div className="avatar" style={{ backgroundColor: '#22c55e' }} />
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
