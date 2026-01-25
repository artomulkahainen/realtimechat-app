import { useUser } from './store/UserContext';
import Chat from './views/Chat';
import Entry from './views/Entry';

export default function App() {
    const { initialized } = useUser();

    return <main>{initialized ? <Chat /> : <Entry />}</main>;
}
