import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='big-card'>
          <Routes>
            <Route
              exact path='/'
              element={<Home />}
            />
            <Route
              path='/sign-up'
              element={<SignUp />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/dashboard'
              element={<Dashboard />}
            />
          </Routes>
          {/* <Home /> */}
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
