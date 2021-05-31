import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen'
import Dashboard from './screen/Dashboard';
import AuthState from './screen/AuthState'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/" style={{ "textDecoration": "none" }}><h2>Jewl</h2></Link>
        </nav>
        <Route exact component={HomeScreen} path="/" />
        <Route component={AuthState(Dashboard)} path="/dashboard" />
        <Route component={LoginScreen} path="/login" />
        {/*<Route component={RegisterScreen} path="/register" />*/}
      </div>
    </BrowserRouter >
  );
}

export default App;
