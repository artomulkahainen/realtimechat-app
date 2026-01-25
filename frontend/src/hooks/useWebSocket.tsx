import { useEffect, useRef, useState } from 'react';
import type { MessageDTO } from '../services/dto/message';

type Props = {
    addMessage: (message: MessageDTO) => void;
};

enum ConnectionStatus {
    CONNECTED = 1,
    DISCONNECTED = 2,
    ERROR = 3,
}

function useWebSocket({ addMessage }: Props) {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
        ConnectionStatus.DISCONNECTED
    );

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const SOCKET_URL = 'ws://localhost:3001/api/ws';
        const socket = new WebSocket(SOCKET_URL);

        socketRef.current = socket;

        // Setup event handlers
        socket.onopen = () => {
            console.log('WebSocket connection established');
            setConnectionStatus(ConnectionStatus.CONNECTED);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as MessageDTO;
                addMessage(data);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus(ConnectionStatus.ERROR);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        };

        return () => {
            console.log('Closing WebSocket connection');
            if (
                socketRef.current &&
                socketRef.current.readyState === WebSocket.OPEN
            ) {
                socketRef.current.close();
            }
        };
    }, []);

    return { connectionStatus, socketRef };
}

export default useWebSocket;
