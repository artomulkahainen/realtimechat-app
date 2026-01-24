import { useUser } from './store/UserContext';
import Chat from './views/Chat';
import Entry from './views/Entry';

function App() {
    const { initialized } = useUser();

    return <main>{initialized ? <Chat /> : <Entry />}</main>;
}

export default App;
