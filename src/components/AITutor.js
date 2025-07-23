import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const AITutor = ({ courseId, courseName }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: `Hi! I'm your AI tutor for ${courseName}. Ask me anything about the course content!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question) => {
    const responses = {
      'explain': 'Let me break that down for you step by step...',
      'example': 'Here\'s a practical example to illustrate this concept...',
      'help': 'I\'m here to help! What specific topic would you like me to explain?',
      'quiz': 'Great question! Let me test your understanding with a quick question...',
      'default': 'That\'s an interesting question! Based on the course material, here\'s what I can tell you...'
    };

    const key = Object.keys(responses).find(k => question.toLowerCase().includes(k)) || 'default';
    return responses[key];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <Bot className="w-6 h-6 text-orange-500 mr-2" />
        <h3 className="font-semibold text-gray-900">AI Tutor</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="flex items-center mb-1">
                {message.type === 'user' ? <User className="w-4 h-4 mr-1" /> : <Bot className="w-4 h-4 mr-1" />}
                <span className="text-xs font-medium">{message.type === 'user' ? 'You' : 'AI Tutor'}</span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;