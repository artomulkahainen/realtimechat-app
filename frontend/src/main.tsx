import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './store/UserContext.tsx';
import { theme } from './utils/theme.ts';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <UserProvider>
            <App />
        </UserProvider>
    </ThemeProvider>
);
