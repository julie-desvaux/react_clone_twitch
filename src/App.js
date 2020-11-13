import './App.css';
import Header from './Component/Header/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Games from './Component/Games/Games';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
    </div>
  );
}

export default App;
