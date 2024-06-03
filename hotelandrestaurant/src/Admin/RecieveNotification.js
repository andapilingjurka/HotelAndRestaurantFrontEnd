import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const ReceiveNotification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/notificationHub')
            .configureLogging(signalR.LogLevel.Information) // Add logging
            .build();

        connection.on('ReceiveNotification', (message) => {
            console.log('Notification received:', message); // Log received notifications
            setNotifications((prevNotifications) => [...prevNotifications, message]);
        });

        connection.start()
            .then(() => {
                console.log('SignalR Connected.');
            })
            .catch((err) => {
                console.error('SignalR Connection Error: ', err);
            });

        return () => {
            connection.stop().then(() => console.log('SignalR Disconnected.'));
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReceiveNotification;
