import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MessageProvider } from './store/MessagesContext.tsx';
import { UserProvider } from './store/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <MessageProvider>
            <App />
        </MessageProvider>
    </UserProvider>
);
