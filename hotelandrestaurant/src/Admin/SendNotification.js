import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../include/Nav';
const SendNotification = () => {
    const [message, setMessage] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleSendNotification = async () => {
        try {
            await axios.post('https://localhost:7264/api/Notification/send-notification', { roomId, message });
            alert('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification.');
        }
    };

    return (
       
        <div>
             <Navbar/>
            <h2>Send Notification</h2>
            <div>
                <label>Room ID:</label>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
            </div>
            <div>
                <label>Message:</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button onClick={handleSendNotification}>Send</button>
        </div>
    );
};

export default SendNotification;
