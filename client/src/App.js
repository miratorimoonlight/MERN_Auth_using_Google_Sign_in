import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './higher_order_component/ProtectedRoute';
import Login from './components/Login';
import Home from './components/Home';
import Protected1 from './components/Protected1';
import Protected2 from './components/Protected2';


function App() {
  return (
    <div className = "container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/protect1" component={Protected1} />
          <ProtectedRoute path="/protect2" component={Protected2} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
