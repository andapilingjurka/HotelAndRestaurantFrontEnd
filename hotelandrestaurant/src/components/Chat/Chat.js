import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        const response = await axios.post('http://localhost:7264/api/chat', { question: input });
        const botMessage = { sender: 'bot', text: response.data.answer };

        setMessages([...messages, userMessage, botMessage]);
        setInput('');
    };

    return (
        <div className="chat-container1">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container1">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ask a question..." 
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
