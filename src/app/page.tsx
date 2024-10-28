'use client'
import React, { KeyboardEventHandler, useState } from 'react';
import { ask } from './actions/gemini';
import { marked } from 'marked';

interface Message {
  role: 'user' | 'chat';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = { role: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');
      setLoading(true);
      ask(input).then(async (response) => {
        const finalMsg = await marked(response);
        simulateTyping(finalMsg);
        setLoading(false);
      });
    }
  };

  const simulateTyping = (text: string) => {
    let index = 0;
    setTypingMessage('');
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        const chatMessage: Message = { role: 'chat', text: text };
        setMessages((messages) => [...messages, chatMessage]);
        setTypingMessage('');
      }
    }, 5); // Adjust the speed of typing here
  };

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && input.trim().length > 0) {
      sendMessage();
    }
  };

  return (
    <section className="prose max-w-none p-4 h-screen flex flex-col">
      <div className="chat-container flex-grow overflow-y-auto p-4 border rounded-lg">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary">¡Bienvenido al chat! Estoy aquí para contestarte preguntas acerca de la ley de libertad religiosa y su aporte a la sociedad colombiana.</div>
        </div>
        {messages.map((message, index) => {
          return (
            <div key={index} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}>
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          </div>
        )}
        {typingMessage && (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">
              <div dangerouslySetInnerHTML={{ __html: typingMessage }} />
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="input input-bordered flex-grow"
          value={input}
          disabled={typingMessage || loading ? true : false}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary ml-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </section>
  );
}
