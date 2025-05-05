import logo from './logo.svg';
import './App.css';

function App() {
  const [str, setStr] = useState("");

  useEffect(() => {
    fetch('https://server-of-server-client.vercel.app/')
      .then((res) => res.json())
      .then((data) => {
        setStr(data.message);
      })
      .catch((err) => {
        console.error('Error fetching message:', err);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <div>{str}</div>
      </header>
    </div>
  );
}

export default App;
