import socketio from 'socket.io-client'
import React from 'react';


const SOCKET_URL = 'http://localhost:3000';

export const socket = socketio(SOCKET_URL, {
    cors: {
        origin: 'http://localhost:8000'
    }
 });
export const SocketContext = React.createContext();