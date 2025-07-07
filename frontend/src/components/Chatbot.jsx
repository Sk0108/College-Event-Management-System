import React, { useState } from 'react';
import './Chatbot.css';
// This component provides a simple AI chatbot interface
// It displays a list of preset questions and answers
// Users can click on a question to see the answer  
// The chatbot can be toggled open or closed by clicking the icon

const presetQuestions = [
  { q: "How do I register for an event?", a: "Click on the 'Register' button below the event card. Fill in your details and submit." },
  { q: "What does 'Approved' mean?", a: "It means the admin has approved the event and you can now register for it." },
  { q: "Can I unregister from an event?", a: "Yes! Click 'Unregister' if you’ve already registered." },
  { q: "Why can't I see some events?", a: "Only admin-approved events are shown on your dashboard." },
  { q: "What are upcoming events?", a: "These are the events you registered for and were approved by the admin." }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(null);

  const toggleBot = () => {
    setIsOpen(!isOpen);
    setActiveAnswer(null); // Reset answer on reopen
  };

  return (
    <>
      {/* Bot Icon */}
      <div className="chatbot-icon" onClick={toggleBot}>
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="AI Bot" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header"> Hi, I’m your AI assistant!</div>
          <div className="chatbot-body">
            {/* Displaying preset questions and answers */}
            {presetQuestions.map((item, idx) => (
              // Each question is clickable and shows the answer when active
              <div key={idx} className="chatbot-question" onClick={() => setActiveAnswer(idx)}>
                {item.q}
                {activeAnswer === idx && <div className="chatbot-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
