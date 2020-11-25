import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Component/Header/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Games from './Component/Games/Games';
import TopStreams from './Component/TopStreams/TopStreams';
import Live from './Component/Live/Live';
import GameStreams from './Component/GameStreams/GameStreams';
import Results from './Component/Results/Results';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
          <Route exact path="/live/:slug" component={Live} />
          <Route exact path="/game/:slug" component={GameStreams} />
          <Route exact path="/results/:slug" component={Results} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
