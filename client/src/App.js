// import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LendingPage from './components/views/LendingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
;
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Router>
      <div>


        <hr />
        <Routes>
          <Route exact path="/" Component={LendingPage} />
          <Route exact path="/login" Component={LoginPage} />
          <Route exact path="/register" Component={RegisterPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
