import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Component/Header/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Games from './Component/Games/Games';
import TopStreams from './Component/TopStreams/TopStreams';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
